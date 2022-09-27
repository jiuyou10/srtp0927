import { ObjectId } from "bson";
import { Questionnaire } from "../../../lib/type";

export interface DisplayedQuestionnaire extends Questionnaire {
  displayedFillInDate?: string;
  userAnswerId?: string;
  result?: string;
  doctorName?: string;
  doctorId?: ObjectId;
  doctorUserName?: string;
}

export type QuestionnaireListArgs = {
  isReport: boolean;
  showAll?: boolean;
};
