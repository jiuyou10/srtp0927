import { IResolvers } from "apollo-server-express";
import { Database, Questionnaire } from "../../../lib/type";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { DisplayedQuestionnaire, QuestionnaireListArgs } from "./type";
import { dateToString, questionnaireSorter } from "../../../lib/utils";
import {
  NO_DOCTOR_LOGIN_ERROR_MESSAGE,
  NO_PATIENT_LOGIN_ERROR_MESSAGE,
} from "../../../lib/utils/constants";

export const questionnaireListResolvers: IResolvers = {
  Query: {
    questionnaireList: async (
      _root: undefined,
      args: QuestionnaireListArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<DisplayedQuestionnaire[]> => {
      if (!req.signedCookies.doctor) {
        throw new Error(NO_DOCTOR_LOGIN_ERROR_MESSAGE);
      }
      if (!args.showAll && !req.signedCookies.patient) {
        throw new Error(NO_PATIENT_LOGIN_ERROR_MESSAGE);
      }
      try {
        const { isReport } = args;
        let list: Questionnaire[];
        if (args.showAll) {
          list = await db.questionnaires
            .find({ disabled: { $ne: true } })
            .toArray();
          list.sort((form1, form2) => form1.order - form2.order);
          return list.map((form) => ({ ...form, done: true }));
        } else {
          list = await db.questionnaires
            .find({ disabled: { $ne: true } })
            .toArray();
          const doctorConfig = await db.doctorConfigs.findOne({
            doctorId: new ObjectId(req.signedCookies.doctor),
            selected: true,
          });
          if (doctorConfig) {
            const formIdStringList = doctorConfig.formIds.map((formId) =>
              formId.toHexString()
            );
            list = list.filter((form) =>
              formIdStringList.includes(form._id.toHexString())
            );
            console.log(list);
          }
        }
        const doneQuestionnairesCursor = await db.userAnswers.find({
          userId: new ObjectId(req.signedCookies.patient),
        });

        const doneQuestionnaires = isReport
          ? await doneQuestionnairesCursor.sort({ fillInDate: 1 }).toArray()
          : await doneQuestionnairesCursor.toArray();

        let listToReturn: DisplayedQuestionnaire[] = [];
        if (isReport) {
          listToReturn = list.flatMap<Questionnaire, DisplayedQuestionnaire>(
            (questionnaire: Questionnaire) => {
              const questionnaireAnswers = doneQuestionnaires.filter(
                (doneQuestionnaire) =>
                  doneQuestionnaire.questionnaireId.equals(questionnaire._id)
              );
              if (questionnaireAnswers.length === 0) {
                return [];
              }
              return questionnaireAnswers.map((questionnaireAnswer) => ({
                ...questionnaire,
                done: true,
                displayedFillInDate: dateToString(
                  questionnaireAnswer.fillInDate
                ),
                fillInDate: questionnaireAnswer.fillInDate,
                userAnswerId: questionnaireAnswer._id.toHexString(),
                result: String(questionnaireAnswer.result),
              }));
            }
          );
          listToReturn.sort(questionnaireSorter(-1));
          const emptyForms = list.flatMap<
            Questionnaire,
            DisplayedQuestionnaire
          >((questionnaire: Questionnaire) => {
            const questionnaireAnswers = doneQuestionnaires.filter(
              (doneQuestionnaire) =>
                doneQuestionnaire.questionnaireId.equals(questionnaire._id)
            );
            if (questionnaireAnswers.length === 0) {
              return {
                ...questionnaire,
                done: false,
              };
            }
            return [];
          });
          listToReturn = [...listToReturn, ...emptyForms];
        } else {
          listToReturn = list.flatMap<Questionnaire, DisplayedQuestionnaire>(
            (questionnaire: Questionnaire) => {
              const questionnaireAnswers = doneQuestionnaires.filter(
                (doneQuestionnaire) =>
                  doneQuestionnaire.questionnaireId.equals(questionnaire._id)
              );
              if (questionnaireAnswers.length === 0) {
                return {
                  ...questionnaire,
                  done: false,
                };
              }
              return questionnaireAnswers.map((questionnaireAnswer) => ({
                ...questionnaire,
                done: true,
                displayedFillInDate: dateToString(
                  questionnaireAnswer.fillInDate
                ),
                fillInDate: questionnaireAnswer.fillInDate,
                userAnswerId: questionnaireAnswer._id.toHexString(),
                result: String(questionnaireAnswer.result),
              }));
            }
          );
          listToReturn.sort((form1, form2) => form1.order - form2.order);
        }
        return listToReturn;
      } catch (e) {
        throw new Error("Failed to get questionnaire list");
      }
    },
  },
  Questionnaire: {
    id: (questionnaire: Questionnaire) => {
      return questionnaire._id.toHexString();
    },
  },
};
