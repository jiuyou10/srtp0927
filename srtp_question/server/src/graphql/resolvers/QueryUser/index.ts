import { ObjectId } from "bson";
import { Request } from "express";
import { Database } from "../../../lib/type";
import { dateToString, questionnaireSorter } from "../../../lib/utils";
import { NO_DOCTOR_LOGIN_ERROR_MESSAGE } from "../../../lib/utils/constants";
import { DisplayedQuestionnaire } from "../QuestionnaireList/type";
import { QueryUserResolversArgs, UserList, UsersFilter } from "./type";

// const DIAGNOSIS_OPTIONS = ["抑郁障碍", "焦虑障碍", "双相障碍", "精神分裂症"];

export const queryUserResolvers = {
  Query: {
    queryUser: async (
      _root: undefined,
      args: QueryUserResolversArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<UserList> => {
      if (!req.signedCookies.doctor) {
        throw new Error(NO_DOCTOR_LOGIN_ERROR_MESSAGE);
      }
      try {
        let maxDate: null | Date = null;
        if (args.maxSignUpDate) {
          maxDate = new Date(
            args.maxSignUpDate.year,
            args.maxSignUpDate.month,
            args.maxSignUpDate.day
          );
          maxDate.setDate(maxDate.getDate() + 1);
        }
        const { filter } = args;
        const queryParams = {
          ...(args.userName ? { userName: args.userName } : {}),
          ...(args.name ? { name: args.name } : {}),
          ...(args.gender && args.gender !== "全部"
            ? { gender: args.gender }
            : {}),
          ...(args.ageRange && (args.ageRange.min || args.ageRange.max)
            ? {
                age: {
                  ...(args.ageRange.min ? { $gte: args.ageRange.min } : {}),
                  ...(args.ageRange.max ? { $lte: args.ageRange.max } : {}),
                },
              }
            : {}),
          ...(args.minSignUpDate || args.maxSignUpDate
            ? {
                signUpDate: {
                  ...(args.minSignUpDate
                    ? {
                        $gte: new Date(
                          args.minSignUpDate.year,
                          args.minSignUpDate.month,
                          args.minSignUpDate.day
                        ),
                      }
                    : {}),
                  ...(args.maxSignUpDate && maxDate
                    ? {
                        $lte: maxDate,
                      }
                    : {}),
                },
              }
            : {}),
          ...(args.onlyMyPatient
            ? { doctor: new ObjectId(req.signedCookies.doctor) }
            : {}),
        };
        const queryParamsList =
          args.additionalFields && args.additionalFields.length >= 1
            ? args.additionalFields.map((option) => ({
                ...queryParams,
                diagnosis: option,
              }))
            : [queryParams];
        let usersCursor = await db.users.find({ $or: queryParamsList });
        if (filter && filter === UsersFilter.DATE_LATEST) {
          usersCursor = usersCursor.sort({ signUpDate: -1 });
        }

        if (filter && filter === UsersFilter.DATE_OLDEST) {
          usersCursor = usersCursor.sort({ signUpDate: 1 });
        }
        usersCursor = usersCursor.skip(
          args.currentPageIndex > 0 ? args.currentPageIndex * args.limit : 0
        );
        usersCursor = usersCursor.limit(args.limit);
        const total = await usersCursor.count();
        const usersArray = await usersCursor.toArray();
        const userListPromise = usersArray.map(async (user) => {
          const userAnswers = await db.userAnswers
            .find({
              userId: user._id,
            })
            .toArray();
          const finishedForms: DisplayedQuestionnaire[] = [];
          for (const userAnswer of userAnswers) {
            const form = await db.questionnaires.findOne(
              userAnswer.questionnaireId
            );
            const doctor = await db.admins.findOne({ _id: userAnswer.doctor });
            if (form) {
              finishedForms.push({
                ...form,
                fillInDate: userAnswer.fillInDate,
                displayedFillInDate: dateToString(userAnswer.fillInDate),
                userAnswerId: userAnswer._id.toHexString(),
                result: String(userAnswer.result),
                doctorName: doctor?.name,
                doctorId: doctor?._id,
                doctorUserName: doctor?.userName,
              });
            }
          }
          finishedForms.sort(questionnaireSorter(-1));
          const doctor = await db.admins.findOne({ _id: user.doctor });
          return {
            ...user,
            signUpDate: dateToString(user.signUpDate),
            finishedForms,
            doctorName: doctor?.name,
            doctorUserName: doctor?.userName,
            doctorId: user.doctor,
            diagnosis: user.diagnosis,
          };
        });
        const userList = await Promise.all(userListPromise);
        return {
          total,
          users: userList,
        };
      } catch (e) {
        throw e;
      }
    },
  },
};
