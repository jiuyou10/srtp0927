import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";

export const calculateASRSResult = async (
  answer: Answer,
  db: Database,
  userId: ObjectId
) => {
  let total = 0;
  for (const choice of answer.answers) {
    total += choice;
  }
  total /= 2;
  await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        ASRSTotal: total,
      },
    }
  );
  return total;
};
