"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionnaireContentResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.questionnaireContentResolvers = {
    Query: {
        questionnaire: async (_root, args, { db }) => {
            try {
                const { id } = args;
                console.log(id);
                const questionnaireContent = await db.questionnaireContents.findOne({
                    questionnaireId: new mongodb_1.ObjectId(id),
                });
                if (questionnaireContent)
                    return questionnaireContent;
                throw new Error();
            }
            catch (e) {
                throw new Error("Cannot get content of the questionnaire");
            }
        },
    },
};
