"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEpqResult = exports.getTScore = void 0;
// x: score.
// m: average score.
// sd: standard diviation.
const getTScore = (x, m, sd) => {
    return (50 + (10 * (x - m)) / sd).toFixed(1);
};
exports.getTScore = getTScore;
const getAverageAndStandardDiviation = (age, gender, form) => {
    if (gender === "男") {
        if (age >= 16 && age < 20) {
            switch (form) {
                case "P":
                    return [6.65, 4.36];
                case "E":
                    return [11.55, 3.99];
                case "N":
                    return [12.31, 4.0];
                case "L":
                    return [11.76, 4.18];
            }
        }
        else if (age >= 20 && age < 30) {
            switch (form) {
                case "P":
                    return [5.96, 2.84];
                case "E":
                    return [10.63, 4.44];
                case "N":
                    return [11.26, 4.26];
                case "L":
                    return [12.17, 3.57];
            }
        }
        else if (age >= 30 && age < 40) {
            switch (form) {
                case "P":
                    return [5.85, 3.32];
                case "E":
                    return [9.92, 3.9];
                case "N":
                    return [12.02, 4.56];
                case "L":
                    return [12.39, 3.93];
            }
        }
        else if (age >= 40 && age < 50) {
            switch (form) {
                case "P":
                    return [5.67, 2.54];
                case "E":
                    return [9.65, 4.77];
                case "N":
                    return [10.12, 5.04];
                case "L":
                    return [13.55, 3.56];
            }
        }
        else if (age >= 50 && age < 60) {
            switch (form) {
                case "P":
                    return [6.05, 3.31];
                case "E":
                    return [8.63, 3.69];
                case "N":
                    return [11.07, 5.31];
                case "L":
                    return [13.93, 3.8];
            }
        }
        else if (age >= 60) {
            switch (form) {
                case "P":
                    return [4.4, 2.33];
                case "E":
                    return [9.8, 4.64];
                case "N":
                    return [8.92, 4.59];
                case "L":
                    return [15.35, 2.73];
            }
        }
    }
    else {
        if (age >= 16 && age < 20) {
            switch (form) {
                case "P":
                    return [5.06, 2.69];
                case "E":
                    return [10.23, 4.09];
                case "N":
                    return [12.28, 4.92];
                case "L":
                    return [12.85, 4.08];
            }
        }
        else if (age >= 20 && age < 30) {
            switch (form) {
                case "P":
                    return [4.92, 2.95];
                case "E":
                    return [8.65, 4.49];
                case "N":
                    return [13.06, 4.42];
                case "L":
                    return [13.35, 3.63];
            }
        }
        else if (age >= 30 && age < 40) {
            switch (form) {
                case "P":
                    return [4.8, 3.33];
                case "E":
                    return [8.97, 4.45];
                case "N":
                    return [12.02, 5.05];
                case "L":
                    return [14.17, 3.68];
            }
        }
        else if (age >= 40 && age < 50) {
            switch (form) {
                case "P":
                    return [4.03, 2.4];
                case "E":
                    return [8.37, 4.35];
                case "N":
                    return [12.15, 5.73];
                case "L":
                    return [15.41, 3.22];
            }
        }
        else if (age >= 50 && age < 60) {
            switch (form) {
                case "P":
                    return [4.05, 2.9];
                case "E":
                    return [9.22, 4.21];
                case "N":
                    return [11.09, 5.21];
                case "L":
                    return [14.09, 4.03];
            }
        }
        else if (age >= 60) {
            switch (form) {
                case "P":
                    return [3.82, 2.41];
                case "E":
                    return [9.34, 4.31];
                case "N":
                    return [11.36, 5.08];
                case "L":
                    return [15.95, 3.65];
            }
        }
    }
    throw new Error("Cannot get average and standard diviation!");
};
const calculateEpqResult = async (answer, db, userId) => {
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
        }
        else {
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
        }
        else {
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
        }
        else {
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
        }
        else {
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
    const result = {
        eTScore: exports.getTScore(e, ...getAverageAndStandardDiviation(userInfo.age, userInfo.gender, "E")),
        nTScore: exports.getTScore(n, ...getAverageAndStandardDiviation(userInfo.age, userInfo.gender, "N")),
        pTScore: exports.getTScore(p, ...getAverageAndStandardDiviation(userInfo.age, userInfo.gender, "P")),
        lTScore: exports.getTScore(l, ...getAverageAndStandardDiviation(userInfo.age, userInfo.gender, "L")),
    };
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            epq88ETScore: Number(result.eTScore),
            epq88NTScore: Number(result.nTScore),
            epq88PTScore: Number(result.pTScore),
            epq88LTScore: Number(result.lTScore),
        },
    });
    return result;
};
exports.calculateEpqResult = calculateEpqResult;
