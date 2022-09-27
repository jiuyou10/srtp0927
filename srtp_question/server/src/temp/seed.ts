// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { ObjectId } from "bson";
import fs from "fs";
import path from "path";
import parser from "xml2json";

import { connectDatabse } from "../database";
import { Admin, UserWithDate } from "../lib/type";

const users: UserWithDate[] = [
  {
    userName: "1234",
    password: "1234",
    name: "胡秋冉",
    gender: "男",
    age: 20,
    education: "高中以下",
    jobStatus: "学生",
    marriageStatus: "未婚",
    catelogy: "User",
    signUpDate: new Date(),
    doctor: new ObjectId(),
  },
];

const admins: Admin[] = [
  {
    userName: "admin",
    password: "admin",
    name: "管理员",
    catelogy: "Admin",
    signUpDate: new Date(),
  },
];

export interface QuestionnaireData {
  name: string;
  instruction: string;
  order: number;
  key: string;
  questions: {
    position: number;
    content: string;
    parent?: string;
    choices: string[];
  }[];
}

const questionnaires: QuestionnaireData[] = [];

const directoryPath = path.join(__dirname, "forms");
const readXmlPromise = new Promise<null>((resolve, reject) => {
  fs.readdir(directoryPath, function (error, fileNames) {
    if (error) {
      reject(error);
    }
    for (const fileName of fileNames) {
      const filePath = path.join(directoryPath, fileName);
      fs.readFile(filePath, "utf8", function (error, data) {
        if (error) {
          reject(error);
        }
        const json = JSON.parse(parser.toJson(data)).scale;
        const questionnaireData = {
          name: json.title,
          instruction: json.instruction,
          questions: [] as QuestionnaireData["questions"],
          order: Number(json.order),
          key: json.key as QuestionnaireData["key"],
        };
        for (const question of json.question) {
          questionnaireData.questions.push({
            position: question.position,
            content: question.content,
            choices: question.choice ? question.choice : [],
            parent: question.parent,
          });
        }
        questionnaires.push(questionnaireData);
        if (questionnaires.length === fileNames.length) {
          resolve(null);
        }
      });
    }
  });
});

const seed = async () => {
  try {
    console.log("[seed]: running...");
    const db = await connectDatabse();
    let adminId: null | ObjectId = null;
    for (const admin of admins) {
      const result = await db.admins.insertOne(admin);
      adminId = result.insertedId;
    }
    for (const user of users) {
      await db.users.insertOne({
        ...user,
        ...(adminId ? { doctor: adminId } : {}),
      });
    }
    await readXmlPromise;
    for (const questionnaire of questionnaires) {
      console.log(questionnaire);
      const { name, order, key, ...rest } = questionnaire;
      const insertResult = await db.questionnaires.insertOne({
        name,
        order,
        key,
      });
      await db.questionnaireContents.insertOne({
        questionnaireId: insertResult.insertedId,
        name,
        key,
        ...rest,
      });
    }
    console.log("[seed]: success");
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();
