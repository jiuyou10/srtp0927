import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";

export interface PsssResult {
  psssTotal: number;
  psssP: number;
  psssS: number;
  userGender?: string;
}

const P_INDEXES = [5, 10, 11, 12, 17, 21, 25];
export const calculatePsssResult = async (
  answer: Answer,
  db: Database,
  userId: ObjectId
): Promise<PsssResult> => {
  let total = 0;
  let p = 0;
  let s = 0;
  for (let i = 0; i < answer.answers.length; i++) {
    const choice = answer.answers[i];
    if (P_INDEXES.includes(i + 1)) {
      p += choice;
    } else {
      s += choice;
    }
    total += choice;
  }
  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        psssP: p,
        psssS: s,
        psssTotal: total,
      },
    }
  );
  return {
    psssP: p,
    psssS: s,
    psssTotal: total,
    userGender: updateRes.value?.gender,
  };
};
