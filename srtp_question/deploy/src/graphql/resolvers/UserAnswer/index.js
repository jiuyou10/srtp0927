"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAnswerResolvers = void 0;
const mongodb_1 = require("mongodb");
const calculateFormAnswer_1 = require("./calculateFormAnswer");
const calculateResult = async (answer, db, userId) => {
    const questionnaire = await db.questionnaires.findOne({
        _id: answer.questionnaireId,
    });
    if (questionnaire && questionnaire.name) {
        switch (questionnaire.key) {
            case "gad-7": {
                return await calculateFormAnswer_1.calculateGad7Result(answer, db, userId);
            }
            case "phq-9": {
                return await calculateFormAnswer_1.calculatePhq7Result(answer, db, userId);
            }
            case "scl-90": {
                const result = await calculateFormAnswer_1.calculateScl90Result(answer, db, userId);
                return JSON.stringify(result);
            }
            case "epq": {
                const result = await calculateFormAnswer_1.calculateEpqResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "children-epq": {
                const result = await calculateFormAnswer_1.calculateEpqChildrenResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "yale-brown": {
                const result = await calculateFormAnswer_1.calculateYaleBrownResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "hcl-32": {
                const result = await calculateFormAnswer_1.calculateHcl32Result(answer, db, userId);
                return result;
            }
            case "epds": {
                const result = await calculateFormAnswer_1.calculateEpdsResult(answer, db, userId);
                return result;
            }
            case "psss": {
                const result = await calculateFormAnswer_1.calculatePsssResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "mdq": {
                const result = await calculateFormAnswer_1.calculateMdqResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "psqi": {
                const result = await calculateFormAnswer_1.calculatePsqiResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "phcss": {
                const result = await calculateFormAnswer_1.calculatePhcssResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "embu": {
                const result = await calculateFormAnswer_1.calculateEmbuResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "PSS-10": {
                const result = await calculateFormAnswer_1.calculatePSS10Result(answer, db, userId);
                return JSON.stringify(result);
            }
            case "HAMA": {
                const result = await calculateFormAnswer_1.calculateHAMAResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "ASRS": {
                const result = await calculateFormAnswer_1.calculateASRSResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "HAMD": {
                const result = await calculateFormAnswer_1.calculateHAMDResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "HAMS": {
                const result = await calculateFormAnswer_1.calculateHAMSResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "CPSS": {
                const result = await calculateFormAnswer_1.calculateCPSSResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "CPO": {
                const result = await calculateFormAnswer_1.calculateCPOResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "PTED": {
                const result = await calculateFormAnswer_1.calculatePTEDResult(answer, db, userId);
                return JSON.stringify(result);
            }
            case "NTT": {
                const result = await calculateFormAnswer_1.calculateNTTResult(answer, db, userId);
                return JSON.stringify(result);
            }
        }
    }
    throw new Error("Cannot calculate result");
};
const saveAnswers = async (isPartial, db, req, input) => {
    const { answers, questionnaireId } = input;
    const userId = new mongodb_1.ObjectId(req.signedCookies.patient);
    try {
        const answer = {
            questionnaireId: new mongodb_1.ObjectId(questionnaireId),
            userId,
            answers,
            fillInDate: new Date(),
        };
        if (isPartial) {
            db.partialAnswers.findOneAndReplace({
                userId,
                questionnaireId: new mongodb_1.ObjectId(questionnaireId),
            }, answer, { upsert: true });
        }
        else {
            db.userAnswers.insertOne({
                ...answer,
                doctor: new mongodb_1.ObjectId(req.signedCookies.doctor),
                result: await calculateResult(answer, db, userId),
            });
            db.partialAnswers.findOneAndDelete({
                userId,
                questionnaireId: new mongodb_1.ObjectId(questionnaireId),
            });
        }
        return {
            didRequest: true,
        };
    }
    catch (e) {
        console.log(e);
        throw new Error("Failed to save answer.");
    }
};
const getUserAnswer = async (isPartial, req, db, questionnaireId) => {
    try {
        const userId = new mongodb_1.ObjectId(req.signedCookies.patient);
        const queryParams = {
            questionnaireId: new mongodb_1.ObjectId(questionnaireId),
            userId: new mongodb_1.ObjectId(userId),
        };
        const userAnswer = isPartial
            ? await db.partialAnswers.findOne(queryParams)
            : await db.userAnswers.findOne(queryParams);
        const answers = userAnswer ? userAnswer.answers : [];
        return {
            answers,
            ...(isPartial ? { date: userAnswer === null || userAnswer === void 0 ? void 0 : userAnswer.fillInDate } : {}),
        };
    }
    catch {
        throw new Error("Failed to fetch answer record.");
    }
};
exports.userAnswerResolvers = {
    Query: {
        userAnswer: async (_root, { questionnaireId }, { db, req }) => {
            return await getUserAnswer(false, req, db, questionnaireId);
        },
        partialAnswer: async (_root, { questionnaireId }, { db, req }) => {
            return await getUserAnswer(true, req, db, questionnaireId);
        },
    },
    Mutation: {
        saveUserAnswer: async (_root, { input }, { db, req }) => {
            return saveAnswers(false, db, req, input);
        },
        savePartialAnswer: async (_root, { input }, { db, req }) => {
            return saveAnswers(true, db, req, input);
        },
    },
};
