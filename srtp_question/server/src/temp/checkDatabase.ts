// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { connectDatabse } from "../database";

const checkDatabase = async () => {
  const db = await connectDatabse();
  const users = await db.users.find({}).toArray();
  console.log("Users", users);
  const userAnswers = await db.userAnswers.find({}).toArray();
  console.log("User answers", userAnswers);
};

checkDatabase();
