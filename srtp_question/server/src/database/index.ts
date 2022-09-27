// Our goal is to export a fuction when run will make the connection with the database.
import { MongoClient } from "mongodb";
import {
  Database,
  QuestionnaireContent,
  Questionnaire,
  UserAnswer,
  UserWithId,
  AdminWithId,
  DoctorConfig,
} from "../lib/type";

// My DB is in the local.
const url = `mongodb://localhost:27017/`; // URL of the MongoDB database.

export const connectDatabse = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("questionnaire"); // Name of the database.
  return {
    users: db.collection<UserWithId>("users"), // Name of the collection.
    admins: db.collection<AdminWithId>("admins"),
    questionnaires: db.collection<Questionnaire>("questionnaires"),
    questionnaireContents: db.collection<QuestionnaireContent>(
      "questionnaireContents"
    ),
    userAnswers: db.collection<UserAnswer>("userAnswers"),
    partialAnswers: db.collection<UserAnswer>("partialAnswers"),
    doctorConfigs: db.collection<DoctorConfig>("doctorConfig"),
  };
};
