import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";

export interface YaleBrownResult {
  yaleBrownMind: number;
  yaleBrownBehavior: number;
  yaleBrownTotal: number;
}
export const calculateYaleBrownResult = async (
  answer: Answer,
  db: Database,
  userId: ObjectId
): Promise<YaleBrownResult> => {
  let total = 0;
  let mind = 0;
  let behavior = 0;
  for (let i = 0; i < answer.answers.length; i++) {
    const choice = answer.answers[i];
    if (i <= 4) {
      mind += choice;
    } else {
      behavior += choice;
    }
    total += choice;
  }
  await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        yaleBrownMind: mind,
        yaleBrownBehavior: behavior,
        yaleBrownTotal: total,
      },
    }
  );
  return {
    yaleBrownMind: mind,
    yaleBrownBehavior: behavior,
    yaleBrownTotal: total,
  };
};
