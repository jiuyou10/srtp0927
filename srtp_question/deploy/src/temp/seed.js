"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const bson_1 = require("bson");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const xml2json_1 = __importDefault(require("xml2json"));
const database_1 = require("../database");
const users = [
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
        doctor: new bson_1.ObjectId(),
    },
];
const admins = [
    {
        userName: "admin",
        password: "admin",
        name: "管理员",
        catelogy: "Admin",
        signUpDate: new Date(),
    },
];
const questionnaires = [];
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
        const db = await database_1.connectDatabse();
        let adminId = null;
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
    }
    catch {
        throw new Error("failed to seed database");
    }
};
seed();
