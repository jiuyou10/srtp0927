import { ObjectId } from "mongodb";
import { Database, QuestionnaireContent } from "../../../lib/type";
import { QuestionnaireContentArgs } from "./type";

export const questionnaireContentResolvers = {
  Query: {
    questionnaire: async (
      _root: undefined,
      args: QuestionnaireContentArgs,
      { db }: { db: Database }
    ): Promise<QuestionnaireContent> => {
      try {
        const { id } = args;
        console.log(id);

        const questionnaireContent = await db.questionnaireContents.findOne({
          questionnaireId: new ObjectId(id),
        });
        if (questionnaireContent) return questionnaireContent;
        throw new Error();
      } catch (e) {
        throw new Error("Cannot get content of the questionnaire");
      }
    },
  },
};
