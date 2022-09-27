import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";

export interface MdqResult {
  mdqTotal: number;
  isMdqTwoSituationsHappenAtSameTime: boolean;
  mdqInfluence: number;
}

export const calculateMdqResult = async (
  answer: Answer,
  db: Database,
  userId: ObjectId
): Promise<MdqResult> => {
  let total = 0;
  for (let i = 0; i < 13; i++) {
    const choice = answer.answers[i];
    total += choice === 0 ? 1 : 0;
  }
  const isMdqTwoSituationsHappenAtSameTime = answer.answers[13] === 0;
  const mdqInfluence = answer.answers[14];
  await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        mdqTotal: total,
        isMdqTwoSituationsHappenAtSameTime,
        mdqInfluence,
      },
    }
  );
  return {
    mdqTotal: total,
    isMdqTwoSituationsHappenAtSameTime,
    mdqInfluence,
  };
};
