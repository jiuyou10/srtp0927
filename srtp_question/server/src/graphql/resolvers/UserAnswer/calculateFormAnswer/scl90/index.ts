import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";
import { Scl90Result } from "../../types";

export const calculateScl90Result = async (
  answer: Answer,
  db: Database,
  userId: ObjectId
) => {
  const f1Array = [1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58];
  const f2Array = [3, 9, 10, 28, 38, 45, 46, 51, 55, 65];
  const f3Array = [6, 21, 34, 36, 37, 41, 61, 69, 73];
  const f4Array = [5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79];
  const f5Array = [2, 17, 23, 33, 39, 57, 72, 78, 80, 86];
  const f6Array = [11, 24, 63, 67, 74, 81];
  const f7Array = [13, 25, 47, 50, 70, 75, 82];
  const f8Array = [8, 18, 43, 68, 76, 83];
  const f9Array = [7, 16, 35, 62, 77, 84, 85, 87, 88, 90];
  const f10Array = [19, 44, 59, 60, 64, 66, 89];
  let total = 0;
  let positiveSymptomTotal = 0;
  let numberOfItemsGreaterThanOrEqualToTwo = 0;
  for (const choice of answer.answers) {
    total += choice + 1;
    if (choice + 1 >= 2) {
      numberOfItemsGreaterThanOrEqualToTwo += 1;
      positiveSymptomTotal += choice + 1;
    }
  }
  const generalSymptomaticIndex = (total / 90).toFixed(1); // Average.
  const numberOfItemsLessThanTwo = 90 - numberOfItemsGreaterThanOrEqualToTwo;
  const positiveSymptomDistressLevel =
    numberOfItemsGreaterThanOrEqualToTwo !== 0
      ? (total / numberOfItemsGreaterThanOrEqualToTwo).toFixed(1)
      : "";
  const positiveSymptomAverage =
    numberOfItemsGreaterThanOrEqualToTwo !== 0
      ? (positiveSymptomTotal / numberOfItemsGreaterThanOrEqualToTwo).toFixed(1)
      : "";
  // F1.
  let f1Total = 0;
  for (const index of f1Array) {
    f1Total += answer.answers[index - 1] + 1;
  }
  const f1 = (f1Total / f1Array.length).toFixed(1);
  // F2.
  let f2Total = 0;
  for (const index of f2Array) {
    f2Total += answer.answers[index - 1] + 1;
  }
  const f2 = (f2Total / f2Array.length).toFixed(1);
  // F3
  let f3Total = 0;
  for (const index of f3Array) {
    f3Total += answer.answers[index - 1] + 1;
  }
  const f3 = (f3Total / f3Array.length).toFixed(1);
  // F4
  let f4Total = 0;
  for (const index of f4Array) {
    f4Total += answer.answers[index - 1] + 1;
  }
  const f4 = (f4Total / f4Array.length).toFixed(1);
  // F5.
  let f5Total = 0;
  for (const index of f5Array) {
    f5Total += answer.answers[index - 1] + 1;
  }
  const f5 = (f5Total / f5Array.length).toFixed(1);
  // F6.
  let f6Total = 0;
  for (const index of f6Array) {
    f6Total += answer.answers[index - 1] + 1;
  }
  const f6 = (f6Total / f6Array.length).toFixed(1);
  // F7.
  let f7Total = 0;
  for (const index of f7Array) {
    f7Total += answer.answers[index - 1] + 1;
  }
  const f7 = (f7Total / f7Array.length).toFixed(1);
  // F8.
  let f8Total = 0;
  for (const index of f8Array) {
    f8Total += answer.answers[index - 1] + 1;
  }
  const f8 = (f8Total / f8Array.length).toFixed(1);
  // F9.
  let f9Total = 0;
  for (const index of f9Array) {
    f9Total += answer.answers[index - 1] + 1;
  }
  const f9 = (f9Total / f9Array.length).toFixed(1);
  // F10
  let f10Total = 0;
  for (const index of f10Array) {
    f10Total += answer.answers[index - 1] + 1;
  }
  const f10 = (f10Total / f10Array.length).toFixed(1);
  const result: Scl90Result = {
    total,
    generalSymptomaticIndex,
    numberOfItemsGreaterThanOrEqualToTwo,
    numberOfItemsLessThanTwo,
    positiveSymptomDistressLevel,
    positiveSymptomAverage,
    f1,
    f2,
    f3,
    f4,
    f5,
    f6,
    f7,
    f8,
    f9,
    f10,
  };
  await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        scl90Total: total,
        scl90GeneralSymptomaticIndex: Number(generalSymptomaticIndex),
        scl90NumberOfItemsGreaterThanOrEqualToTwo: numberOfItemsGreaterThanOrEqualToTwo,
        scl90NumberOfItemsLessThanTwo: numberOfItemsLessThanTwo,
        scl90PositiveSymptomDistressLevel: positiveSymptomDistressLevel
          ? Number(positiveSymptomDistressLevel)
          : undefined,
        scl90PositiveSymptomAverage: positiveSymptomAverage
          ? Number(positiveSymptomAverage)
          : undefined,
        scl90F1: Number(f1),
        scl90F2: Number(f2),
        scl90F3: Number(f3),
        scl90F4: Number(f4),
        scl90F5: Number(f5),
        scl90F6: Number(f6),
        scl90F7: Number(f7),
        scl90F8: Number(f8),
        scl90F9: Number(f9),
        scl90F10: Number(f10),
      },
    }
  );
  return result;
};
