"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const database_1 = require("../database");
const checkDatabase = async () => {
    const db = await database_1.connectDatabse();
    const users = await db.users.find({}).toArray();
    console.log("Users", users);
    const userAnswers = await db.userAnswers.find({}).toArray();
    console.log("User answers", userAnswers);
};
checkDatabase();
