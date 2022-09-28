import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";

export const calculateMADRSResult = async (
  answer: Answer,
  db: Database,
  userId: ObjectId
) => {
  let total = 0;
 // console.log("choice: "+answer.answers);
  for (const choice of answer.answers) {
    
    
      total+=choice
    
  }
  await db.users.findOneAndUpdate(
    { _id: userId },
    { $set: { madrsTotal: total } }
  );
  return total;
};