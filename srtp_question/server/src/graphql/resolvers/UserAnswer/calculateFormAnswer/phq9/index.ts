import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";

export const calculatePhq7Result = async (
  answer: Answer,
  db: Database,
  userId: ObjectId
) => {
  let total = 0;
  for (const choice of answer.answers) {
    total += choice;
  }
  await db.users.findOneAndUpdate(
    { _id: userId },
    { $set: { phq9Total: total } }
  );
  return total;
};
