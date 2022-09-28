// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import fs from "fs";
import path from "path";
import parser from "xml2json";
import { connectDatabse } from "../database";
import { QuestionnaireData } from "./seed";

const questionnaireArray: QuestionnaireData[] = [];

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
        questionnaireArray.push(questionnaireData);
        if (questionnaireArray.length === fileNames.length) {
          resolve(null);
        }
      });
    }
  });
});
const reloadForms = async () => {
  try {
    console.log("[reload forms]: running...");
    const db = await connectDatabse();
    // const questionnaires = await db.questionnaires.find({}).toArray();
    // if (questionnaires.length) {
    //   await db.questionnaires.drop();
    // }
    // const questionnaireContents = await db.questionnaireContents
    //   .find({})
    //   .toArray();
    // if (questionnaireContents.length) {
    //   await db.questionnaireContents.drop();
    // }
    await readXmlPromise;
    for (const questionnaire of questionnaireArray) {
      const { name, order, key, ...rest } = questionnaire;
      const existingForm = await db.questionnaires.findOne({
        name: questionnaire.name,
      });
      console.log(existingForm);
      if (existingForm) {
        await db.questionnaires.findOneAndUpdate(
          { name: questionnaire.name },
          { $set: { order: questionnaire.order, key } }
        );
        await db.questionnaireContents.findOneAndUpdate(
          {
            name: existingForm.name,
          },
          {
            $set: {
              name,
              key,
              ...rest,
            },
          }
        );
      } else {
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
    }
    const isDisabled = process.env.NODE_ENV === "deployment" ? true : false;
    await db.questionnaires.findOneAndUpdate(
      { name: "艾森克个性测试儿童版（EPQ）" },
      { $set: { disabled: isDisabled } }
    );
    await db.questionnaires.findOneAndUpdate(
      { key: "yale-brown" },
      { $set: { disabled: isDisabled } }
    );
    await db.questionnaires.findOneAndUpdate(
      { key: "hcl-32" },
      { $set: { disabled: isDisabled } }
    );
    await db.questionnaires.findOneAndUpdate(
      { key: "epds" },
      { $set: { disabled: isDisabled } }
    );
    await db.questionnaires.findOneAndUpdate(
      { key: "psss" },
      { $set: { disabled: isDisabled } }
    );
    await db.questionnaires.findOneAndUpdate(
      { key: "mdq" },
      { $set: { disabled: isDisabled } }
    );
    await db.questionnaires.findOneAndUpdate(
      { key: "psqi" },
      { $set: { disabled: isDisabled } }
    );
	await db.questionnaires.findOneAndUpdate(
      { key: "pss-10" },
      { $set: { disabled: isDisabled } }
    );
	await db.questionnaires.findOneAndUpdate(
      { key: "HAMA" },
      { $set: { disabled: isDisabled } }
    );
	await db.questionnaires.findOneAndUpdate(
      { key: "ASRS" },
      { $set: { disabled: isDisabled } }
    );
	await db.questionnaires.findOneAndUpdate(
      { key: "HAMD" },
      { $set: { disabled: isDisabled } }
    );
	await db.questionnaires.findOneAndUpdate(
      { key: "HAMS" },
      { $set: { disabled: isDisabled } }
    );
	await db.questionnaires.findOneAndUpdate(
      { key: "CPSS" },
      { $set: { disabled: isDisabled } }
    );
 
	await db.questionnaires.findOneAndUpdate(
      { key: "CPO" },
      { $set: { disabled: isDisabled } }
    );
	await db.questionnaires.findOneAndUpdate(
      { key: "PTED" },
      { $set: { disabled: isDisabled } }
    );
	await db.questionnaires.findOneAndUpdate(
      { key: "NTT" },
      { $set: { disabled: isDisabled } }
    );
    console.log("[reload forms]: success");
  } catch {
    throw new Error("failed to clear database");
  }
};

reloadForms();
