import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";

export const calculateEpdsResult = async (
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
    {
      $set: {
        epdsTotal: total,
      },
    }
  );
  return total;
};
