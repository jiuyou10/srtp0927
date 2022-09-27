import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";

export const calculateHcl32Result = async (
  answer: Answer,
  db: Database,
  userId: ObjectId
): Promise<number> => {
  let total = 0;
  for (let i = 0; i < answer.answers.length; i++) {
    const choice = answer.answers[i];
    total += choice === 0 ? 1 : 0;
  }
  await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        hcl32Total: total,
      },
    }
  );
  return total;
};
