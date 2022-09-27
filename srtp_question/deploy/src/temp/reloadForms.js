"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const xml2json_1 = __importDefault(require("xml2json"));
const database_1 = require("../database");
const questionnaireArray = [];
const directoryPath = path_1.default.join(__dirname, "forms");
const readXmlPromise = new Promise((resolve, reject) => {
    fs_1.default.readdir(directoryPath, function (error, fileNames) {
        if (error) {
            reject(error);
        }
        for (const fileName of fileNames) {
            const filePath = path_1.default.join(directoryPath, fileName);
            fs_1.default.readFile(filePath, "utf8", function (error, data) {
                if (error) {
                    reject(error);
                }
                const json = JSON.parse(xml2json_1.default.toJson(data)).scale;
                const questionnaireData = {
                    name: json.title,
                    instruction: json.instruction,
                    questions: [],
                    order: Number(json.order),
                    key: json.key,
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
        const db = await database_1.connectDatabse();
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
                await db.questionnaires.findOneAndUpdate({ name: questionnaire.name }, { $set: { order: questionnaire.order, key } });
                await db.questionnaireContents.findOneAndUpdate({
                    name: existingForm.name,
                }, {
                    $set: {
                        name,
                        key,
                        ...rest,
                    },
                });
            }
            else {
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
        await db.questionnaires.findOneAndUpdate({ name: "艾森克个性测试儿童版（EPQ）" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "yale-brown" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "hcl-32" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "epds" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "psss" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "mdq" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "psqi" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "pss-10" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "HAMA" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "ASRS" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "HAMD" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "HAMS" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "CPSS" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "CPO" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "PTED" }, { $set: { disabled: isDisabled } });
        await db.questionnaires.findOneAndUpdate({ key: "NTT" }, { $set: { disabled: isDisabled } });
        console.log("[reload forms]: success");
    }
    catch {
        throw new Error("failed to clear database");
    }
};
reloadForms();
