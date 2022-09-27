import { ObjectId } from "bson";
import { Answer } from "../..";
import { Database } from "../../../../../lib/type";
import { TScores } from "../../types";

// x: score.
// m: average score.
// sd: standard diviation.
export const getTScore = (x: number, m: number, sd: number) => {
  return (50 + (10 * (x - m)) / sd).toFixed(1);
};

const getAverageAndStandardDiviation = (
  age: number,
  gender: string,
  form: "P" | "E" | "N" | "L"
): readonly [number, number] => {
  if (gender === "男") {
    if (age >= 16 && age < 20) {
      switch (form) {
        case "P":
          return [6.65, 4.36] as const;
        case "E":
          return [11.55, 3.99] as const;
        case "N":
          return [12.31, 4.0] as const;
        case "L":
          return [11.76, 4.18] as const;
      }
    } else if (age >= 20 && age < 30) {
      switch (form) {
        case "P":
          return [5.96, 2.84] as const;
        case "E":
          return [10.63, 4.44] as const;
        case "N":
          return [11.26, 4.26] as const;
        case "L":
          return [12.17, 3.57] as const;
      }
    } else if (age >= 30 && age < 40) {
      switch (form) {
        case "P":
          return [5.85, 3.32] as const;
        case "E":
          return [9.92, 3.9] as const;
        case "N":
          return [12.02, 4.56] as const;
        case "L":
          return [12.39, 3.93] as const;
      }
    } else if (age >= 40 && age < 50) {
      switch (form) {
        case "P":
          return [5.67, 2.54] as const;
        case "E":
          return [9.65, 4.77] as const;
        case "N":
          return [10.12, 5.04] as const;
        case "L":
          return [13.55, 3.56] as const;
      }
    } else if (age >= 50 && age < 60) {
      switch (form) {
        case "P":
          return [6.05, 3.31] as const;
        case "E":
          return [8.63, 3.69] as const;
        case "N":
          return [11.07, 5.31] as const;
        case "L":
          return [13.93, 3.8] as const;
      }
    } else if (age >= 60) {
      switch (form) {
        case "P":
          return [4.4, 2.33] as const;
        case "E":
          return [9.8, 4.64] as const;
        case "N":
          return [8.92, 4.59] as const;
        case "L":
          return [15.35, 2.73] as const;
      }
    }
  } else {
    if (age >= 16 && age < 20) {
      switch (form) {
        case "P":
          return [5.06, 2.69] as const;
        case "E":
          return [10.23, 4.09] as const;
        case "N":
          return [12.28, 4.92] as const;
        case "L":
          return [12.85, 4.08] as const;
      }
    } else if (age >= 20 && age < 30) {
      switch (form) {
        case "P":
          return [4.92, 2.95] as const;
        case "E":
          return [8.65, 4.49] as const;
        case "N":
          return [13.06, 4.42] as const;
        case "L":
          return [13.35, 3.63] as const;
      }
    } else if (age >= 30 && age < 40) {
      switch (form) {
        case "P":
          return [4.8, 3.33] as const;
        case "E":
          return [8.97, 4.45] as const;
        case "N":
          return [12.02, 5.05] as const;
        case "L":
          return [14.17, 3.68] as const;
      }
    } else if (age >= 40 && age < 50) {
      switch (form) {
        case "P":
          return [4.03, 2.4] as const;
        case "E":
          return [8.37, 4.35] as const;
        case "N":
          return [12.15, 5.73] as const;
        case "L":
          return [15.41, 3.22] as const;
      }
    } else if (age >= 50 && age < 60) {
      switch (form) {
        case "P":
          return [4.05, 2.9] as const;
        case "E":
          return [9.22, 4.21] as const;
        case "N":
          return [11.09, 5.21] as const;
        case "L":
          return [14.09, 4.03] as const;
      }
    } else if (age >= 60) {
      switch (form) {
        case "P":
          return [3.82, 2.41] as const;
        case "E":
          return [9.34, 4.31] as const;
        case "N":
          return [11.36, 5.08] as const;
        case "L":
          return [15.95, 3.65] as const;
      }
    }
  }
  throw new Error("Cannot get average and standard diviation!");
};
export const calculateEpqResult = async (
  answer: Answer,
  db: Database,
  userId: ObjectId
) => {
  let p = 0;
  let e = 0;
  let n = 0;
  let l = 0;
  // P
  const pArray = [
    -2,
    -6,
    -9,
    -11,
    -18,
    22,
    26,
    30,
    34,
    -38,
    -42,
    46,
    50,
    -56,
    -62,
    66,
    68,
    -72,
    75,
    76,
    81,
    85,
    -88,
  ];
  for (const pIndex of pArray) {
    const choice = answer.answers[Math.abs(pIndex) - 1];
    if (pIndex > 0) {
      p += choice === 0 ? 1 : 0;
    } else {
      p += choice === 1 ? 1 : 0;
    }
  }
  // E
  const eArray = [
    1,
    5,
    10,
    13,
    14,
    17,
    -21,
    25,
    -29,
    33,
    37,
    41,
    -45,
    49,
    53,
    55,
    61,
    65,
    71,
    80,
    84,
  ];
  for (const eIndex of eArray) {
    const choice = answer.answers[Math.abs(eIndex) - 1];
    if (eIndex > 0) {
      e += choice === 0 ? 1 : 0;
    } else {
      e += choice === 1 ? 1 : 0;
    }
  }
  // N
  const nArray = [
    3,
    7,
    12,
    15,
    19,
    23,
    27,
    31,
    35,
    39,
    43,
    47,
    51,
    57,
    59,
    63,
    67,
    69,
    73,
    74,
    77,
    78,
    82,
    86,
  ];
  for (const nIndex of nArray) {
    const choice = answer.answers[Math.abs(nIndex) - 1];
    if (nIndex > 0) {
      n += choice === 0 ? 1 : 0;
    } else {
      n += choice === 1 ? 1 : 0;
    }
  }
  // L
  const lArray = [
    -4,
    -8,
    -16,
    20,
    -24,
    -28,
    32,
    36,
    -40,
    -44,
    -48,
    -52,
    -54,
    58,
    -60,
    -64,
    -70,
    -79,
    -83,
    87,
  ];
  for (const lIndex of lArray) {
    const choice = answer.answers[Math.abs(lIndex) - 1];
    if (lIndex > 0) {
      l += choice === 0 ? 1 : 0;
    } else {
      l += choice === 1 ? 1 : 0;
    }
  }
  // Calculate original T.
  const userInfo = await db.users.findOne({ _id: userId });
  if (!userInfo) {
    throw new Error("Cannot find this user!");
  }
  if (!userInfo.gender) {
    throw new Error("This user does not have gender information!");
  }
  if (!userInfo.age) {
    throw new Error("This user does not have age information!");
  }

  const result: TScores = {
    eTScore: getTScore(
      e,
      ...getAverageAndStandardDiviation(userInfo.age, userInfo.gender, "E")
    ),
    nTScore: getTScore(
      n,
      ...getAverageAndStandardDiviation(userInfo.age, userInfo.gender, "N")
    ),
    pTScore: getTScore(
      p,
      ...getAverageAndStandardDiviation(userInfo.age, userInfo.gender, "P")
    ),
    lTScore: getTScore(
      l,
      ...getAverageAndStandardDiviation(userInfo.age, userInfo.gender, "L")
    ),
  };
  await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        epq88ETScore: Number(result.eTScore),
        epq88NTScore: Number(result.nTScore),
        epq88PTScore: Number(result.pTScore),
        epq88LTScore: Number(result.lTScore),
      },
    }
  );
  return result;
};
