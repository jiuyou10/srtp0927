// // eslint-disable-next-line @typescript-eslint/no-var-requires
// require("dotenv").config();
// import { connectDatabse } from "../database";
// const clear = async () => {
//   try {
//     console.log("[clear]: running...");
//     const db = await connectDatabse();
//     const users = await db.users.find({}).toArray();
//     if (users.length > 0) {
//       await db.users.drop();
//     }
//     const admins = await db.admins.find({}).toArray;
//     if (admins.length > 0) {
//       await db.admins.drop();
//     }
//     const questionnaires = await db.questionnaires.find({}).toArray();
//     if (questionnaires.length) {
//       await db.questionnaires.drop();
//     }
//     const questionnaireContents = await db.questionnaireContents
//       .find({})
//       .toArray();
//     if (questionnaireContents.length) {
//       await db.questionnaireContents.drop();
//     }
//     const userAnswers = await db.userAnswers.find({}).toArray();
//     if (userAnswers.length) {
//       await db.userAnswers.drop();
//     }
//     const partialAnswers = await db.partialAnswers.find({}).toArray();
//     if (partialAnswers.length) {
//       await db.partialAnswers.drop();
//     }
//     console.log("[clear]: success");
//   } catch {
//     throw new Error("failed to clear database");
//   }
// };
// clear();
