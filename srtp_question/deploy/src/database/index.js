"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabse = void 0;
// Our goal is to export a fuction when run will make the connection with the database.
const mongodb_1 = require("mongodb");
// My DB is in the local.
const url = `mongodb://localhost:27017/`; // URL of the MongoDB database.
const connectDatabse = async () => {
    const client = await mongodb_1.MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("questionnaire"); // Name of the database.
    return {
        users: db.collection("users"),
        admins: db.collection("admins"),
        questionnaires: db.collection("questionnaires"),
        questionnaireContents: db.collection("questionnaireContents"),
        userAnswers: db.collection("userAnswers"),
        partialAnswers: db.collection("partialAnswers"),
        doctorConfigs: db.collection("doctorConfig"),
    };
};
exports.connectDatabse = connectDatabse;
