"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionnaireListResolvers = void 0;
const mongodb_1 = require("mongodb");
const utils_1 = require("../../../lib/utils");
const constants_1 = require("../../../lib/utils/constants");
exports.questionnaireListResolvers = {
    Query: {
        questionnaireList: async (_root, args, { db, req }) => {
            if (!req.signedCookies.doctor) {
                throw new Error(constants_1.NO_DOCTOR_LOGIN_ERROR_MESSAGE);
            }
            if (!args.showAll && !req.signedCookies.patient) {
                throw new Error(constants_1.NO_PATIENT_LOGIN_ERROR_MESSAGE);
            }
            try {
                const { isReport } = args;
                let list;
                if (args.showAll) {
                    list = await db.questionnaires
                        .find({ disabled: { $ne: true } })
                        .toArray();
                    list.sort((form1, form2) => form1.order - form2.order);
                    return list.map((form) => ({ ...form, done: true }));
                }
                else {
                    list = await db.questionnaires
                        .find({ disabled: { $ne: true } })
                        .toArray();
                    const doctorConfig = await db.doctorConfigs.findOne({
                        doctorId: new mongodb_1.ObjectId(req.signedCookies.doctor),
                        selected: true,
                    });
                    if (doctorConfig) {
                        const formIdStringList = doctorConfig.formIds.map((formId) => formId.toHexString());
                        list = list.filter((form) => formIdStringList.includes(form._id.toHexString()));
                        console.log(list);
                    }
                }
                const doneQuestionnairesCursor = await db.userAnswers.find({
                    userId: new mongodb_1.ObjectId(req.signedCookies.patient),
                });
                const doneQuestionnaires = isReport
                    ? await doneQuestionnairesCursor.sort({ fillInDate: 1 }).toArray()
                    : await doneQuestionnairesCursor.toArray();
                let listToReturn = [];
                if (isReport) {
                    listToReturn = list.flatMap((questionnaire) => {
                        const questionnaireAnswers = doneQuestionnaires.filter((doneQuestionnaire) => doneQuestionnaire.questionnaireId.equals(questionnaire._id));
                        if (questionnaireAnswers.length === 0) {
                            return [];
                        }
                        return questionnaireAnswers.map((questionnaireAnswer) => ({
                            ...questionnaire,
                            done: true,
                            displayedFillInDate: utils_1.dateToString(questionnaireAnswer.fillInDate),
                            fillInDate: questionnaireAnswer.fillInDate,
                            userAnswerId: questionnaireAnswer._id.toHexString(),
                            result: String(questionnaireAnswer.result),
                        }));
                    });
                    listToReturn.sort(utils_1.questionnaireSorter(-1));
                    const emptyForms = list.flatMap((questionnaire) => {
                        const questionnaireAnswers = doneQuestionnaires.filter((doneQuestionnaire) => doneQuestionnaire.questionnaireId.equals(questionnaire._id));
                        if (questionnaireAnswers.length === 0) {
                            return {
                                ...questionnaire,
                                done: false,
                            };
                        }
                        return [];
                    });
                    listToReturn = [...listToReturn, ...emptyForms];
                }
                else {
                    listToReturn = list.flatMap((questionnaire) => {
                        const questionnaireAnswers = doneQuestionnaires.filter((doneQuestionnaire) => doneQuestionnaire.questionnaireId.equals(questionnaire._id));
                        if (questionnaireAnswers.length === 0) {
                            return {
                                ...questionnaire,
                                done: false,
                            };
                        }
                        return questionnaireAnswers.map((questionnaireAnswer) => ({
                            ...questionnaire,
                            done: true,
                            displayedFillInDate: utils_1.dateToString(questionnaireAnswer.fillInDate),
                            fillInDate: questionnaireAnswer.fillInDate,
                            userAnswerId: questionnaireAnswer._id.toHexString(),
                            result: String(questionnaireAnswer.result),
                        }));
                    });
                    listToReturn.sort((form1, form2) => form1.order - form2.order);
                }
                return listToReturn;
            }
            catch (e) {
                throw new Error("Failed to get questionnaire list");
            }
        },
    },
    Questionnaire: {
        id: (questionnaire) => {
            return questionnaire._id.toHexString();
        },
    },
};
