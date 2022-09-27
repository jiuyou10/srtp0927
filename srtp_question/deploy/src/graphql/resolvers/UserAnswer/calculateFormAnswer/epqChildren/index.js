"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEpqChildrenResult = void 0;
const calculateEpqChildrenResult = async (answer, db, userId) => {
    let p = 0;
    let e = 0;
    let n = 0;
    let l = 0;
    // P
    const pArray = [
        3,
        7,
        12,
        15,
        23,
        32,
        35,
        39,
        43,
        47,
        51,
        53,
        55,
        59,
        60,
        -30,
        -66,
        -77,
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
        13,
        17,
        19,
        21,
        25,
        28,
        33,
        37,
        41,
        45,
        57,
        61,
        64,
        68,
        71,
        75,
        79,
        83,
        85,
        86,
        88,
        -9,
        -49,
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
        2,
        6,
        10,
        14,
        18,
        22,
        26,
        29,
        34,
        38,
        42,
        46,
        50,
        54,
        58,
        62,
        65,
        69,
        72,
        74,
        76,
        81,
        84,
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
        8,
        24,
        27,
        31,
        36,
        44,
        48,
        52,
        56,
        63,
        78,
        -4,
        -11,
        -16,
        -20,
        -40,
        -67,
        -70,
        -73,
        -80,
        -82,
        -87,
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
    let originalE = undefined;
    let originalN = undefined;
    let originalP = undefined;
    let originalL = undefined;
    if (userInfo.gender === "男") {
        // Calculate original T for male.
        const age = userInfo.age;
        if (age < 7) {
            throw new Error("Age is smaller than 7!");
        }
        if (age > 15) {
            throw new Error("Age is greater than 15!");
        }
        if (age === 7) {
            if (e <= 2) {
                originalE = 15;
            }
            else if (e >= 3 && e <= 4) {
                originalE = 20;
            }
            else if (e >= 5 && e <= 6) {
                originalE = 25;
            }
            else if (e >= 7 && e <= 8) {
                originalE = 30;
            }
            else if (e >= 9 && e <= 10) {
                originalE = 35;
            }
            else if (e >= 11 && e <= 12) {
                originalE = 40;
            }
            else if (e >= 13 && e <= 14) {
                originalE = 45;
            }
            else if (e >= 15 && e <= 16) {
                originalE = 50;
            }
            else if (e >= 17 && e <= 18) {
                originalE = 55;
            }
            else if (e >= 19 && e <= 20) {
                originalE = 60;
            }
            else if (e >= 21 && e <= 22) {
                originalE = 65;
            }
            else if (e >= 23) {
                originalE = 70;
            }
            if (n <= 1) {
                originalN = 35;
            }
            else if (n >= 2 && n <= 4) {
                originalN = 40;
            }
            else if (n >= 5 && n <= 6) {
                originalN = 45;
            }
            else if (n >= 7 && n <= 8) {
                originalN = 50;
            }
            else if (n >= 9 && n <= 10) {
                originalN = 55;
            }
            else if (n >= 11 && n <= 12) {
                originalN = 60;
            }
            else if (n >= 13 && n <= 15) {
                originalN = 65;
            }
            else if (n >= 16 && n <= 17) {
                originalN = 70;
            }
            else if (n >= 18 && n <= 19) {
                originalN = 75;
            }
            else if (n >= 20 && n <= 21) {
                originalN = 80;
            }
            else if (n >= 22) {
                originalN = 85;
            }
            if (p <= 1) {
                originalP = 35;
            }
            else if (p === 2) {
                originalP = 40;
            }
            else if (p >= 3 && p <= 4) {
                originalP = 45;
            }
            else if (p === 5) {
                originalP = 50;
            }
            else if (p >= 6 && p <= 7) {
                originalP = 55;
            }
            else if (p === 8) {
                originalP = 60;
            }
            else if (p >= 9 && p <= 10) {
                originalP = 65;
            }
            else if (p === 11) {
                originalP = 70;
            }
            else if (p === 12) {
                originalP = 75;
            }
            else if (p >= 13 && p <= 14) {
                originalP = 80;
            }
            else if (p === 15) {
                originalP = 85;
            }
            else if (p >= 16) {
                originalP = 90;
            }
            if (l <= 2) {
                originalL = 15;
            }
            else if (l >= 3 && l <= 4) {
                originalL = 20;
            }
            else if (l >= 5 && l <= 6) {
                originalL = 25;
            }
            else if (l >= 7 && l <= 8) {
                originalL = 30;
            }
            else if (l >= 9 && l <= 10) {
                originalL = 35;
            }
            else if (l >= 11 && l <= 12) {
                originalL = 40;
            }
            else if (l === 13) {
                originalL = 45;
            }
            else if (l >= 14 && l <= 15) {
                originalL = 50;
            }
            else if (l >= 16 && l <= 17) {
                originalL = 55;
            }
            else if (l >= 18 && l <= 19) {
                originalL = 60;
            }
            else if (l >= 18 && l <= 19) {
                originalL = 60;
            }
            else if (l >= 20 && l <= 21) {
                originalL = 65;
            }
            else if (l >= 22) {
                originalL = 70;
            }
        }
        else if (age === 8) {
            if (e <= 1) {
                originalE = 10;
            }
            else if (e >= 2 && e <= 3) {
                originalE = 15;
            }
            else if (e >= 4 && e <= 5) {
                originalE = 20;
            }
            else if (e >= 6 && e <= 7) {
                originalE = 25;
            }
            else if (e >= 8 && e <= 9) {
                originalE = 30;
            }
            else if (e >= 10 && e <= 12) {
                originalE = 35;
            }
            else if (e >= 13 && e <= 14) {
                originalE = 40;
            }
            else if (e >= 15 && e <= 16) {
                originalE = 45;
            }
            else if (e >= 17 && e <= 18) {
                originalE = 50;
            }
            else if (e >= 19 && e <= 20) {
                originalE = 55;
            }
            else if (e === 21) {
                originalE = 60;
            }
            else if (e >= 22) {
                originalE = 65;
            }
            if (n <= 1) {
                originalN = 35;
            }
            else if (n >= 2 && n <= 3) {
                originalN = 40;
            }
            else if (n >= 4 && n <= 5) {
                originalN = 45;
            }
            else if (n >= 6 && n <= 7) {
                originalN = 50;
            }
            else if (n >= 8 && n <= 9) {
                originalN = 55;
            }
            else if (n >= 10 && n <= 11) {
                originalN = 60;
            }
            else if (n >= 12 && n <= 13) {
                originalN = 65;
            }
            else if (n >= 14 && n <= 15) {
                originalN = 70;
            }
            else if (n >= 16 && n <= 17) {
                originalN = 75;
            }
            else if (n >= 18 && n <= 19) {
                originalN = 80;
            }
            else if (n >= 20 && n <= 21) {
                originalN = 85;
            }
            else if (n >= 22) {
                originalN = 90;
            }
            if (p <= 2) {
                originalP = 40;
            }
            else if (p === 3) {
                originalP = 45;
            }
            else if (p >= 4 && p <= 5) {
                originalP = 50;
            }
            else if (p <= 6) {
                originalP = 55;
            }
            else if (p >= 7 && p <= 8) {
                originalP = 60;
            }
            else if (p <= 9) {
                originalP = 65;
            }
            else if (p >= 10 && p <= 11) {
                originalP = 70;
            }
            else if (p === 12) {
                originalP = 75;
            }
            else if (p >= 13 && p <= 14) {
                originalP = 80;
            }
            else if (p === 15) {
                originalP = 85;
            }
            else if (p >= 16) {
                originalP = 90;
            }
            if (l <= 2) {
                originalL = 10;
            }
            else if (l >= 3 && l <= 4) {
                originalL = 15;
            }
            else if (l <= 5) {
                originalL = 20;
            }
            else if (l >= 6 && l <= 7) {
                originalL = 25;
            }
            else if (l >= 8 && l <= 9) {
                originalL = 30;
            }
            else if (l === 10) {
                originalL = 35;
            }
            else if (l >= 11 && l <= 12) {
                originalL = 40;
            }
            else if (l >= 13 && l <= 14) {
                originalL = 45;
            }
            else if (l >= 15 && l <= 16) {
                originalL = 50;
            }
            else if (l === 17) {
                originalL = 55;
            }
            else if (l >= 18 && l <= 19) {
                originalL = 60;
            }
            else if (l >= 20 && l <= 21) {
                originalL = 65;
            }
            else if (l >= 22) {
                originalL = 70;
            }
        }
        else if (age === 9) {
            if (e <= 1) {
                originalE = 0;
            }
            else if (e <= 2) {
                originalE = 5;
            }
            else if (e >= 3 && e <= 4) {
                originalE = 10;
            }
            else if (e >= 5 && e <= 6) {
                originalE = 15;
            }
            else if (e <= 7) {
                originalE = 20;
            }
            else if (e >= 8 && e <= 9) {
                originalE = 25;
            }
            else if (e >= 10 && e <= 11) {
                originalE = 30;
            }
            else if (e <= 12) {
                originalE = 35;
            }
            else if (e >= 13 && e <= 14) {
                originalE = 40;
            }
            else if (e >= 15 && e <= 16) {
                originalE = 45;
            }
            else if (e === 17) {
                originalE = 50;
            }
            else if (e >= 18 && e <= 19) {
                originalE = 55;
            }
            else if (e >= 20 && e <= 21) {
                originalE = 60;
            }
            else if (e >= 22 && e <= 23) {
                originalE = 65;
            }
            else if (e >= 24) {
                originalE = 70;
            }
            if (n <= 2) {
                originalN = 35;
            }
            else if (n >= 3 && n <= 4) {
                originalN = 40;
            }
            else if (n >= 5 && n <= 6) {
                originalN = 45;
            }
            else if (n >= 7 && n <= 9) {
                originalN = 50;
            }
            else if (n >= 10 && n <= 11) {
                originalN = 55;
            }
            else if (n >= 12 && n <= 13) {
                originalN = 60;
            }
            else if (n >= 14 && n <= 15) {
                originalN = 65;
            }
            else if (n >= 16 && n <= 18) {
                originalN = 70;
            }
            else if (n >= 19 && n <= 20) {
                originalN = 75;
            }
            else if (n >= 21 && n <= 22) {
                originalN = 80;
            }
            else if (n >= 23) {
                originalN = 85;
            }
            if (p <= 2) {
                originalP = 40;
            }
            else if (p === 3) {
                originalP = 45;
            }
            else if (p >= 4 && p <= 5) {
                originalP = 50;
            }
            else if (p >= 6 && p <= 7) {
                originalP = 55;
            }
            else if (p === 8) {
                originalP = 60;
            }
            else if (p >= 9 && p <= 10) {
                originalP = 65;
            }
            else if (p >= 11 && p <= 12) {
                originalP = 70;
            }
            else if (p === 13) {
                originalP = 75;
            }
            else if (p >= 14 && p <= 15) {
                originalP = 80;
            }
            else if (p >= 16) {
                originalP = 85;
            }
            if (l <= 1) {
                originalL = 25;
            }
            else if (l >= 2 && l <= 4) {
                originalL = 30;
            }
            else if (l >= 5 && l <= 7) {
                originalL = 35;
            }
            else if (l >= 8 && l <= 9) {
                originalL = 40;
            }
            else if (l >= 10 && l <= 12) {
                originalL = 45;
            }
            else if (l >= 13 && l <= 14) {
                originalL = 50;
            }
            else if (l >= 15 && l <= 17) {
                originalL = 55;
            }
            else if (l >= 18 && l <= 20) {
                originalL = 60;
            }
            else if (l >= 21) {
                originalL = 65;
            }
        }
        else if (age === 10) {
            if (e <= 1) {
                originalE = 0;
            }
            else if (e >= 2 && e <= 3) {
                originalE = 5;
            }
            else if (e <= 4) {
                originalE = 10;
            }
            else if (e >= 5 && e <= 6) {
                originalE = 15;
            }
            else if (e >= 7 && e <= 8) {
                originalE = 20;
            }
            else if (e >= 9 && e <= 10) {
                originalE = 25;
            }
            else if (e >= 11 && e <= 12) {
                originalE = 30;
            }
            else if (e <= 13) {
                originalE = 35;
            }
            else if (e >= 14 && e <= 15) {
                originalE = 40;
            }
            else if (e >= 16 && e <= 17) {
                originalE = 45;
            }
            else if (e >= 18 && e <= 19) {
                originalE = 50;
            }
            else if (e >= 20 && e <= 21) {
                originalE = 55;
            }
            else if (e <= 22) {
                originalE = 60;
            }
            else if (e >= 23) {
                originalE = 65;
            }
            if (n <= 1) {
                originalN = 35;
            }
            else if (n >= 2 && n <= 4) {
                originalN = 40;
            }
            else if (n >= 5 && n <= 6) {
                originalN = 45;
            }
            else if (n >= 7 && n <= 8) {
                originalN = 50;
            }
            else if (n >= 9 && n <= 11) {
                originalN = 55;
            }
            else if (n >= 12 && n <= 13) {
                originalN = 60;
            }
            else if (n >= 14 && n <= 15) {
                originalN = 65;
            }
            else if (n >= 16 && n <= 17) {
                originalN = 70;
            }
            else if (n >= 18 && n <= 20) {
                originalN = 75;
            }
            else if (n >= 21 && n <= 22) {
                originalN = 80;
            }
            else if (n >= 23) {
                originalN = 85;
            }
            if (p <= 2) {
                originalP = 40;
            }
            else if (p === 3) {
                originalP = 45;
            }
            else if (p === 4 || p === 5) {
                originalP = 50;
            }
            else if (p === 6) {
                originalP = 55;
            }
            else if (p <= 7) {
                originalP = 60;
            }
            else if (p === 8 || p === 9) {
                originalP = 65;
            }
            else if (p === 10) {
                originalP = 70;
            }
            else if (p >= 11 && p <= 12) {
                originalP = 75;
            }
            else if (p <= 13) {
                originalP = 80;
            }
            else if (p === 14) {
                originalP = 85;
            }
            else if (p === 15 || p === 16 || p >= 15) {
                originalP = 90;
            }
            if (l <= 1) {
                originalL = 20;
            }
            else if (l >= 2 && l <= 3) {
                originalL = 25;
            }
            else if (l >= 4 && l <= 6) {
                originalL = 30;
            }
            else if (l === 7 || l === 8) {
                originalL = 35;
            }
            else if (l >= 9 && l <= 10) {
                originalL = 40;
            }
            else if (l >= 11 && l <= 13) {
                originalL = 45;
            }
            else if (l >= 14 && l <= 15) {
                originalL = 50;
            }
            else if (l === 16 || l === 17) {
                originalL = 55;
            }
            else if (l >= 18 && l <= 20) {
                originalL = 60;
            }
            else if (l >= 21) {
                originalL = 65;
            }
        }
        else if (age === 11) {
            if (e <= 4) {
                originalE = 0;
            }
            else if (e >= 5 && e <= 6) {
                originalE = 5;
            }
            else if (e <= 7) {
                originalE = 10;
            }
            else if (e >= 8 && e <= 9) {
                originalE = 15;
            }
            else if (e <= 10) {
                originalE = 20;
            }
            else if (e === 11 || e === 12) {
                originalE = 25;
            }
            else if (e <= 13) {
                originalE = 30;
            }
            else if (e >= 14 && e <= 15) {
                originalE = 35;
            }
            else if (e <= 16) {
                originalE = 40;
            }
            else if (e >= 17 && e <= 18) {
                originalE = 45;
            }
            else if (e === 19) {
                originalE = 50;
            }
            else if (e === 20 || e === 21) {
                originalE = 55;
            }
            else if (e === 22) {
                originalE = 60;
            }
            else if (e >= 23) {
                originalE = 65;
            }
            if (n <= 2) {
                originalN = 35;
            }
            else if (n >= 3 && n <= 4) {
                originalN = 40;
            }
            else if (n >= 5 && n <= 7) {
                originalN = 45;
            }
            else if (n >= 8 && n <= 9) {
                originalN = 50;
            }
            else if (n >= 10 && n <= 11) {
                originalN = 55;
            }
            else if (n >= 12 && n <= 13) {
                originalN = 60;
            }
            else if (n >= 14 && n <= 16) {
                originalN = 65;
            }
            else if (n >= 17 && n <= 18) {
                originalN = 70;
            }
            else if (n >= 19 && n <= 20) {
                originalN = 75;
            }
            else if (n >= 21 && n <= 22) {
                originalN = 80;
            }
            else if (n >= 23) {
                originalN = 85;
            }
            if (p <= 1) {
                originalP = 35;
            }
            else if (p >= 2 && p <= 3) {
                originalP = 40;
            }
            else if (p === 4) {
                originalP = 45;
            }
            else if (p >= 5 && p <= 6) {
                originalP = 50;
            }
            else if (p === 7) {
                originalP = 55;
            }
            else if (p === 8) {
                originalP = 60;
            }
            else if (p >= 9 && p <= 10) {
                originalP = 65;
            }
            else if (p === 11) {
                originalP = 70;
            }
            else if (p >= 12 && p <= 13) {
                originalP = 75;
            }
            else if (p === 14) {
                originalP = 80;
            }
            else if (p >= 15 && p <= 16) {
                originalP = 85;
            }
            else if (p >= 17) {
                originalP = 90;
            }
            if (l <= 1) {
                originalL = 20;
            }
            else if (l >= 2 && l <= 3) {
                originalL = 25;
            }
            else if (l >= 4 && l <= 5) {
                originalL = 30;
            }
            else if (l >= 6 && l <= 7) {
                originalL = 35;
            }
            else if (l >= 8 && l <= 9) {
                originalL = 40;
            }
            else if (l >= 10 && l <= 11) {
                originalL = 45;
            }
            else if (l >= 12 && l <= 13) {
                originalL = 50;
            }
            else if (l >= 14 && l <= 15) {
                originalL = 55;
            }
            else if (l >= 16 && l <= 17) {
                originalL = 60;
            }
            else if (l >= 18 && l <= 19) {
                originalL = 65;
            }
            else if (l === 20) {
                originalL = 70;
            }
            else if (l >= 21) {
                originalL = 75;
            }
        }
        else if (age === 12) {
            if (e <= 2) {
                originalE = 0;
            }
            else if (e >= 3 && e <= 5) {
                originalE = 5;
            }
            else if (e <= 6) {
                originalE = 10;
            }
            else if (e >= 7 && e <= 8) {
                originalE = 15;
            }
            else if (e <= 10) {
                originalE = 20;
            }
            else if (e === 11) {
                originalE = 25;
            }
            else if (e <= 13) {
                originalE = 30;
            }
            else if (e >= 14 && e <= 15) {
                originalE = 35;
            }
            else if (e <= 16) {
                originalE = 40;
            }
            else if (e >= 17 && e <= 18) {
                originalE = 45;
            }
            else if (e === 19) {
                originalE = 50;
            }
            else if (e === 20 || e === 21) {
                originalE = 55;
            }
            else if (e === 22 || e === 23) {
                originalE = 60;
            }
            else if (e >= 24) {
                originalE = 65;
            }
            if (n <= 2) {
                originalN = 35;
            }
            else if (n >= 3 && n <= 4) {
                originalN = 40;
            }
            else if (n >= 5 && n <= 6) {
                originalN = 45;
            }
            else if (n >= 7 && n <= 9) {
                originalN = 50;
            }
            else if (n >= 10 && n <= 11) {
                originalN = 55;
            }
            else if (n >= 12 && n <= 14) {
                originalN = 60;
            }
            else if (n >= 15 && n <= 16) {
                originalN = 65;
            }
            else if (n >= 17 && n <= 18) {
                originalN = 70;
            }
            else if (n >= 19 && n <= 21) {
                originalN = 75;
            }
            else if (n >= 22) {
                originalN = 80;
            }
            if (p <= 1) {
                originalP = 35;
            }
            else if (p >= 2 && p <= 3) {
                originalP = 40;
            }
            else if (p === 4) {
                originalP = 45;
            }
            else if (p >= 5 && p <= 6) {
                originalP = 50;
            }
            else if (p === 7) {
                originalP = 55;
            }
            else if (p === 8 || p === 9) {
                originalP = 60;
            }
            else if (p <= 10) {
                originalP = 65;
            }
            else if (p === 11 || p === 12) {
                originalP = 70;
            }
            else if (p >= 12 && p <= 12) {
                originalP = 75;
            }
            else if (p === 14) {
                originalP = 80;
            }
            else if (p >= 15 && p <= 16) {
                originalP = 85;
            }
            else if (p >= 17) {
                originalP = 90;
            }
            if (l <= 1) {
                originalL = 20;
            }
            else if (l >= 2 && l <= 3) {
                originalL = 25;
            }
            else if (l >= 4 && l <= 5) {
                originalL = 30;
            }
            else if (l >= 6 && l <= 7) {
                originalL = 35;
            }
            else if (l >= 8 && l <= 9) {
                originalL = 40;
            }
            else if (l >= 10 && l <= 11) {
                originalL = 45;
            }
            else if (l >= 12 && l <= 13) {
                originalL = 50;
            }
            else if (l >= 14 && l <= 15) {
                originalL = 55;
            }
            else if (l >= 16 && l <= 17) {
                originalL = 60;
            }
            else if (l >= 18 && l <= 19) {
                originalL = 65;
            }
            else if (l === 20 || l === 21) {
                originalL = 70;
            }
            else if (l >= 22) {
                originalL = 75;
            }
        }
        else if (age === 13) {
            if (e <= 2) {
                originalE = 0;
            }
            else if (e >= 3 && e <= 5) {
                originalE = 5;
            }
            else if (e <= 6) {
                originalE = 10;
            }
            else if (e >= 7 && e <= 8) {
                originalE = 15;
            }
            else if (e <= 10) {
                originalE = 20;
            }
            else if (e === 11) {
                originalE = 25;
            }
            else if (e <= 13) {
                originalE = 30;
            }
            else if (e === 14) {
                originalE = 35;
            }
            else if (e <= 16) {
                originalE = 40;
            }
            else if (e === 17) {
                originalE = 45;
            }
            else if (e === 18 || e === 19) {
                originalE = 50;
            }
            else if (e === 20 || e === 21) {
                originalE = 55;
            }
            else if (e === 22) {
                originalE = 60;
            }
            else if (e >= 23) {
                originalE = 65;
            }
            if (n <= 2) {
                originalN = 35;
            }
            else if (n >= 3 && n <= 4) {
                originalN = 40;
            }
            else if (n >= 5 && n <= 7) {
                originalN = 45;
            }
            else if (n >= 8 && n <= 9) {
                originalN = 50;
            }
            else if (n >= 10 && n <= 12) {
                originalN = 55;
            }
            else if (n >= 13 && n <= 15) {
                originalN = 60;
            }
            else if (n >= 16 && n <= 17) {
                originalN = 65;
            }
            else if (n >= 18 && n <= 20) {
                originalN = 70;
            }
            else if (n >= 21 && n <= 22) {
                originalN = 75;
            }
            else if (n >= 23) {
                originalN = 80;
            }
            if (p <= 1) {
                originalP = 35;
            }
            else if (p === 2) {
                originalP = 40;
            }
            else if (p <= 4) {
                originalP = 45;
            }
            else if (p >= 5 && p <= 6) {
                originalP = 50;
            }
            else if (p === 7) {
                originalP = 55;
            }
            else if (p === 8 || p === 9) {
                originalP = 60;
            }
            else if (p >= 10 && p <= 11) {
                originalP = 65;
            }
            else if (p === 12) {
                originalP = 70;
            }
            else if (p >= 13 && p <= 14) {
                originalP = 75;
            }
            else if (p === 15 || p === 16) {
                originalP = 80;
            }
            else if (p >= 17) {
                originalP = 85;
            }
            if (l >= 1 && l <= 2) {
                originalL = 25;
            }
            else if (l >= 3 && l <= 4) {
                originalL = 30;
            }
            else if (l >= 5 && l <= 6) {
                originalL = 35;
            }
            else if (l >= 7 && l <= 8) {
                originalL = 40;
            }
            else if (l >= 9 && l <= 11) {
                originalL = 45;
            }
            else if (l >= 12 && l <= 13) {
                originalL = 50;
            }
            else if (l >= 14 && l <= 15) {
                originalL = 55;
            }
            else if (l >= 16 && l <= 17) {
                originalL = 60;
            }
            else if (l >= 18 && l <= 19) {
                originalL = 65;
            }
            else if (l === 20 || l === 21) {
                originalL = 70;
            }
            else if (l >= 22) {
                originalL = 75;
            }
        }
        else if (age === 14) {
            if (e <= 2) {
                originalE = 0;
            }
            else if (e >= 3 && e <= 4) {
                originalE = 5;
            }
            else if (e <= 5) {
                originalE = 10;
            }
            else if (e >= 6 && e <= 7) {
                originalE = 15;
            }
            else if (e <= 9) {
                originalE = 20;
            }
            else if (e === 10) {
                originalE = 25;
            }
            else if (e <= 12) {
                originalE = 30;
            }
            else if (e >= 13 && e <= 14) {
                originalE = 35;
            }
            else if (e <= 15) {
                originalE = 40;
            }
            else if (e >= 16 && e <= 17) {
                originalE = 45;
            }
            else if (e === 18 || e === 19) {
                originalE = 50;
            }
            else if (e === 20) {
                originalE = 55;
            }
            else if (e === 21 || e === 22) {
                originalE = 60;
            }
            else if (e >= 23) {
                originalE = 65;
            }
            if (n <= 3) {
                originalN = 35;
            }
            else if (n >= 4 && n <= 5) {
                originalN = 40;
            }
            else if (n >= 6 && n <= 8) {
                originalN = 45;
            }
            else if (n >= 9 && n <= 10) {
                originalN = 50;
            }
            else if (n >= 11 && n <= 12) {
                originalN = 55;
            }
            else if (n >= 13 && n <= 15) {
                originalN = 60;
            }
            else if (n >= 16 && n <= 17) {
                originalN = 65;
            }
            else if (n >= 18 && n <= 20) {
                originalN = 70;
            }
            else if (n >= 21 && n <= 22) {
                originalN = 75;
            }
            else if (n >= 23) {
                originalN = 80;
            }
            if (p <= 2) {
                originalP = 35;
            }
            else if (p === 3) {
                originalP = 40;
            }
            else if (p === 4) {
                originalP = 45;
            }
            else if (p >= 5 && p <= 6) {
                originalP = 50;
            }
            else if (p === 7) {
                originalP = 55;
            }
            else if (p === 8 || p === 9) {
                originalP = 60;
            }
            else if (p <= 10) {
                originalP = 65;
            }
            else if (p === 11 || p === 12) {
                originalP = 70;
            }
            else if (p === 13) {
                originalP = 75;
            }
            else if (p === 14) {
                originalP = 80;
            }
            else if (p >= 15 && p <= 16) {
                originalP = 85;
            }
            else if (p >= 17) {
                originalP = 90;
            }
            if (l <= 3) {
                originalL = 25;
            }
            else if (l >= 4 && l <= 5) {
                originalL = 30;
            }
            else if (l >= 6 && l <= 7) {
                originalL = 35;
            }
            else if (l >= 8 && l <= 9) {
                originalL = 40;
            }
            else if (l >= 10 && l <= 12) {
                originalL = 45;
            }
            else if (l >= 13 && l <= 14) {
                originalL = 50;
            }
            else if (l >= 15 && l <= 16) {
                originalL = 55;
            }
            else if (l >= 17 && l <= 19) {
                originalL = 60;
            }
            else if (l >= 20 && l <= 21) {
                originalL = 65;
            }
            else if (l >= 22) {
                originalL = 70;
            }
        }
        else if (age === 15) {
            if (e <= 1) {
                originalE = 10;
            }
            else if (e >= 2 && e <= 3) {
                originalE = 15;
            }
            else if (e <= 5) {
                originalE = 20;
            }
            else if (e >= 6 && e <= 7) {
                originalE = 25;
            }
            else if (e <= 9) {
                originalE = 30;
            }
            else if (e === 10 || e === 11) {
                originalE = 35;
            }
            else if (e <= 13) {
                originalE = 40;
            }
            else if (e >= 14 && e <= 16) {
                originalE = 45;
            }
            else if (e <= 18) {
                originalE = 50;
            }
            else if (e >= 19 && e <= 20) {
                originalE = 55;
            }
            else if (e === 21 || p === 22) {
                originalE = 60;
            }
            else if (e >= 23) {
                originalE = 65;
            }
            if (n <= 2) {
                originalN = 35;
            }
            else if (n >= 3 && n <= 5) {
                originalN = 40;
            }
            else if (n >= 6 && n <= 7) {
                originalN = 45;
            }
            else if (n >= 8 && n <= 10) {
                originalN = 50;
            }
            else if (n >= 11 && n <= 12) {
                originalN = 55;
            }
            else if (n >= 13 && n <= 15) {
                originalN = 60;
            }
            else if (n >= 16 && n <= 17) {
                originalN = 65;
            }
            else if (n >= 18 && n <= 20) {
                originalN = 70;
            }
            else if (n >= 21 && n <= 22) {
                originalN = 75;
            }
            else if (n >= 23) {
                originalN = 80;
            }
            if (p <= 1) {
                originalP = 35;
            }
            else if (p === 2) {
                originalP = 40;
            }
            else if (p <= 4) {
                originalP = 45;
            }
            else if (p === 5) {
                originalP = 50;
            }
            else if (p === 6 || p === 7) {
                originalP = 55;
            }
            else if (p === 8) {
                originalP = 60;
            }
            else if (p >= 9 && p <= 10) {
                originalP = 65;
            }
            else if (p === 11) {
                originalP = 70;
            }
            else if (p === 12) {
                originalP = 75;
            }
            else if (p === 13 || p === 14) {
                originalP = 80;
            }
            else if (p === 15) {
                originalP = 85;
            }
            else if (p >= 16) {
                originalP = 90;
            }
            if (l === 1) {
                originalL = 25;
            }
            else if (l >= 2 && l <= 4) {
                originalL = 30;
            }
            else if (l >= 5 && l <= 6) {
                originalL = 35;
            }
            else if (l >= 7 && l <= 8) {
                originalL = 40;
            }
            else if (l >= 9 && l <= 11) {
                originalL = 45;
            }
            else if (l >= 12 && l <= 13) {
                originalL = 50;
            }
            else if (l >= 14 && l <= 16) {
                originalL = 55;
            }
            else if (l >= 17 && l <= 18) {
                originalL = 60;
            }
            else if (l >= 19 && l <= 21) {
                originalL = 65;
            }
            else if (l >= 22) {
                originalL = 70;
            }
        }
    }
    else {
        // Calculate original T for female.
        const age = userInfo.age;
        if (age < 7) {
            throw new Error("Age is smaller than 7!");
        }
        if (age > 15) {
            throw new Error("Age is greater than 15!");
        }
        if (age === 7) {
            if (e <= 5) {
                originalE = 0;
            }
            else if (e === 6) {
                originalE = 5;
            }
            else if (e >= 7 && e <= 8) {
                originalE = 10;
            }
            else if (e === 9) {
                originalE = 15;
            }
            else if (e === 10) {
                originalE = 20;
            }
            else if (e === 11) {
                originalE = 25;
            }
            else if (e >= 12 && e <= 13) {
                originalE = 30;
            }
            else if (e === 14) {
                originalE = 35;
            }
            else if (e === 15) {
                originalE = 40;
            }
            else if (e === 16) {
                originalE = 45;
            }
            else if (e === 17) {
                originalE = 50;
            }
            else if (e >= 18 && e <= 19) {
                originalE = 55;
            }
            else if (e === 20) {
                originalE = 60;
            }
            else if (e === 21) {
                originalE = 65;
            }
            else if (e === 22) {
                originalE = 70;
            }
            else if (e === 23 || e === 24) {
                originalE = 75;
            }
            else if (e >= 25) {
                originalE = 80;
            }
            if (n <= 1) {
                originalN = 35;
            }
            else if (n >= 2 && n <= 3) {
                originalN = 40;
            }
            else if (n === 4) {
                originalN = 45;
            }
            else if (n >= 5 && n <= 6) {
                originalN = 50;
            }
            else if (n >= 7 && n <= 8) {
                originalN = 55;
            }
            else if (n >= 9 && n <= 10) {
                originalN = 60;
            }
            else if (n >= 11 && n <= 12) {
                originalN = 65;
            }
            else if (n >= 13 && n <= 14) {
                originalN = 70;
            }
            else if (n === 15) {
                originalN = 75;
            }
            else if (n >= 16 && n <= 17) {
                originalN = 80;
            }
            else if (n >= 18 && n <= 19) {
                originalN = 85;
            }
            else if (n >= 20 && n <= 21) {
                originalN = 90;
            }
            else if (n >= 22) {
                originalN = 95;
            }
            if (p <= 1) {
                originalP = 40;
            }
            else if (p === 2) {
                originalP = 45;
            }
            else if (p >= 3 && p <= 4) {
                originalP = 50;
            }
            else if (p === 5) {
                originalP = 55;
            }
            else if (p === 6) {
                originalP = 60;
            }
            else if (p >= 7 && p <= 8) {
                originalP = 65;
            }
            else if (p === 9) {
                originalP = 70;
            }
            else if (p === 10) {
                originalP = 75;
            }
            else if (p >= 11 && p <= 12) {
                originalP = 80;
            }
            else if (p === 13) {
                originalP = 85;
            }
            else if (p === 14) {
                originalP = 90;
            }
            else if (p >= 15 && p <= 16) {
                originalP = 95;
            }
            else if (p === 17) {
                originalP = 100;
            }
            else if (p >= 18) {
                originalP = 105;
            }
            if (l <= 5) {
                originalL = 0;
            }
            else if (l === 6) {
                originalL = 5;
            }
            else if (l === 7) {
                originalL = 10;
            }
            else if (l >= 8 && l <= 9) {
                originalL = 15;
            }
            else if (l === 10) {
                originalL = 20;
            }
            else if (l === 11) {
                originalL = 25;
            }
            else if (l === 12) {
                originalL = 30;
            }
            else if (l >= 13 && l <= 14) {
                originalL = 35;
            }
            else if (l === 15) {
                originalL = 40;
            }
            else if (l === 16) {
                originalL = 45;
            }
            else if (l >= 17 && l <= 18) {
                originalL = 50;
            }
            else if (l === 19) {
                originalL = 55;
            }
            else if (l === 20) {
                originalL = 60;
            }
            else if (l === 21) {
                originalL = 65;
            }
            else if (l >= 22) {
                originalL = 70;
            }
        }
        else if (age === 8) {
            if (e <= 2) {
                originalE = 5;
            }
            else if (e >= 3 && e <= 4) {
                originalE = 10;
            }
            else if (e === 5) {
                originalE = 15;
            }
            else if (e === 6 || e === 7) {
                originalE = 20;
            }
            else if (e === 8 || e === 9) {
                originalE = 25;
            }
            else if (e >= 10 && e <= 11) {
                originalE = 30;
            }
            else if (e === 12) {
                originalE = 35;
            }
            else if (e === 13 || e === 14) {
                originalE = 40;
            }
            else if (e === 15 || e === 16) {
                originalE = 45;
            }
            else if (e === 17 || e === 18) {
                originalE = 50;
            }
            else if (e === 19) {
                originalE = 55;
            }
            else if (e === 20 || e === 21) {
                originalE = 60;
            }
            else if (e === 22 || e === 23) {
                originalE = 65;
            }
            else if (e >= 24) {
                originalE = 70;
            }
            if (n <= 1) {
                originalN = 35;
            }
            else if (n >= 2 && n <= 3) {
                originalN = 40;
            }
            else if (n >= 4 && e <= 5) {
                originalN = 45;
            }
            else if (n >= 6 && n <= 7) {
                originalN = 50;
            }
            else if (n >= 8 && n <= 9) {
                originalN = 55;
            }
            else if (n >= 10 && n <= 11) {
                originalN = 60;
            }
            else if (n >= 12 && n <= 13) {
                originalN = 65;
            }
            else if (n >= 14 && n <= 15) {
                originalN = 70;
            }
            else if (n === 16 || n === 17) {
                originalN = 75;
            }
            else if (n >= 18 && n <= 19) {
                originalN = 80;
            }
            else if (n >= 20 && n <= 21) {
                originalN = 85;
            }
            else if (n >= 22) {
                originalN = 90;
            }
            if (p <= 1) {
                originalP = 35;
            }
            else if (p === 2) {
                originalP = 40;
            }
            else if (p === 3) {
                originalP = 45;
            }
            else if (p === 4) {
                originalP = 50;
            }
            else if (p === 5) {
                originalP = 55;
            }
            else if (p === 6) {
                originalP = 60;
            }
            else if (p === 7) {
                originalP = 65;
            }
            else if (p === 8) {
                originalP = 70;
            }
            else if (p === 9) {
                originalP = 75;
            }
            else if (p === 10) {
                originalP = 80;
            }
            else if (p === 11) {
                originalP = 85;
            }
            else if (p === 12) {
                originalP = 90;
            }
            else if (p === 13) {
                originalP = 95;
            }
            else if (p === 14) {
                originalP = 100;
            }
            else if (p === 15) {
                originalP = 105;
            }
            else if (p === 16) {
                originalP = 110;
            }
            else if (p === 17) {
                originalP = 115;
            }
            else if (p >= 18) {
                originalP = 120;
            }
            if (l <= 1) {
                originalL = 5;
            }
            else if (l === 2 || l === 3) {
                originalL = 10;
            }
            else if (l === 4 || l === 5) {
                originalL = 15;
            }
            else if (l >= 6 && l <= 7) {
                originalL = 20;
            }
            else if (l === 8) {
                originalL = 25;
            }
            else if (l === 9 || l === 10) {
                originalL = 30;
            }
            else if (l === 11 || l === 12) {
                originalL = 35;
            }
            else if (l >= 13 && l <= 14) {
                originalL = 40;
            }
            else if (l === 15) {
                originalL = 45;
            }
            else if (l === 16 || l === 17) {
                originalL = 50;
            }
            else if (l >= 18 && l <= 19) {
                originalL = 55;
            }
            else if (l === 20 || l === 21) {
                originalL = 60;
            }
            else if (l >= 22) {
                originalL = 65;
            }
        }
        else if (age === 9) {
            if (e <= 2) {
                originalE = 0;
            }
            else if (e === 3 || e === 4) {
                originalE = 5;
            }
            else if (e === 5) {
                originalE = 10;
            }
            else if (e === 6 || e === 7) {
                originalE = 15;
            }
            else if (e === 8) {
                originalE = 20;
            }
            else if (e === 9 || e === 10) {
                originalE = 25;
            }
            else if (e === 11) {
                originalE = 30;
            }
            else if (e === 12 || e === 13) {
                originalE = 35;
            }
            else if (e === 14 || e === 15) {
                originalE = 40;
            }
            else if (e === 16) {
                originalE = 45;
            }
            else if (e === 17 || e === 18) {
                originalE = 50;
            }
            else if (e === 19) {
                originalE = 55;
            }
            else if (e === 20 || e === 21) {
                originalE = 60;
            }
            else if (e === 22) {
                originalE = 65;
            }
            else if (e === 23 || e === 24) {
                originalE = 70;
            }
            else if (e >= 25) {
                originalE = 75;
            }
            if (n <= 2) {
                originalN = 35;
            }
            else if (n >= 3 && n <= 4) {
                originalN = 40;
            }
            else if (n >= 5 && n <= 6) {
                originalN = 45;
            }
            else if (n >= 7 && n <= 9) {
                originalN = 50;
            }
            else if (n >= 10 && n <= 11) {
                originalN = 55;
            }
            else if (n >= 12 && n <= 14) {
                originalN = 60;
            }
            else if (n >= 15 && n <= 16) {
                originalN = 65;
            }
            else if (n >= 17 && n <= 18) {
                originalN = 70;
            }
            else if (n === 19 || n === 20) {
                originalN = 75;
            }
            else if (n >= 21) {
                originalN = 80;
            }
            if (p <= 1) {
                originalP = 40;
            }
            else if (p === 2) {
                originalP = 45;
            }
            else if (p === 3) {
                originalP = 50;
            }
            else if (p === 4) {
                originalP = 55;
            }
            else if (p === 5) {
                originalP = 60;
            }
            else if (p === 6) {
                originalP = 70;
            }
            else if (p === 7) {
                originalP = 75;
            }
            else if (p === 8) {
                originalP = 80;
            }
            else if (p === 9) {
                originalP = 85;
            }
            else if (p === 10) {
                originalP = 90;
            }
            else if (p === 11) {
                originalP = 95;
            }
            else if (p === 12) {
                originalP = 100;
            }
            else if (p === 13) {
                originalP = 105;
            }
            else if (p === 14) {
                originalP = 110;
            }
            else if (p === 15) {
                originalP = 115;
            }
            else if (p >= 16) {
                originalP = 120;
            }
            if (l <= 3) {
                originalL = 0;
            }
            else if (l === 4) {
                originalL = 5;
            }
            else if (l === 5 || l === 6) {
                originalL = 10;
            }
            else if (l === 7) {
                originalL = 15;
            }
            else if (l === 8 || l === 9) {
                originalL = 20;
            }
            else if (l === 10) {
                originalL = 25;
            }
            else if (l === 11 || l === 12) {
                originalL = 30;
            }
            else if (l === 13) {
                originalL = 35;
            }
            else if (l === 14 || l === 14) {
                originalL = 40;
            }
            else if (l === 16) {
                originalL = 45;
            }
            else if (l >= 17 && l <= 18) {
                originalL = 50;
            }
            else if (l === 19) {
                originalL = 55;
            }
            else if (l === 20 || l === 21) {
                originalL = 60;
            }
            else if (l >= 22) {
                originalL = 65;
            }
        }
        else if (age === 10) {
            if (e <= 4) {
                originalE = 0;
            }
            else if (e === 5 || e === 6) {
                originalE = 5;
            }
            else if (e === 7) {
                originalE = 10;
            }
            else if (e === 8 || e === 9) {
                originalE = 15;
            }
            else if (e === 10) {
                originalE = 20;
            }
            else if (e === 11) {
                originalE = 25;
            }
            else if (e >= 12 && e <= 13) {
                originalE = 30;
            }
            else if (e === 14) {
                originalE = 35;
            }
            else if (e === 15 || e === 16) {
                originalE = 40;
            }
            else if (e === 17) {
                originalE = 45;
            }
            else if (e === 18 || e === 19) {
                originalE = 50;
            }
            else if (e === 20) {
                originalE = 55;
            }
            else if (e === 21 || e === 22) {
                originalE = 60;
            }
            else if (e === 23) {
                originalE = 65;
            }
            else if (e >= 24) {
                originalE = 70;
            }
            if (n <= 1) {
                originalN = 35;
            }
            else if (n >= 2 && n <= 3) {
                originalN = 40;
            }
            else if (n >= 4 && n <= 5) {
                originalN = 45;
            }
            else if (n >= 6 && n <= 7) {
                originalN = 50;
            }
            else if (n >= 8 && n <= 10) {
                originalN = 55;
            }
            else if (n >= 11 && n <= 12) {
                originalN = 60;
            }
            else if (n >= 13 && n <= 14) {
                originalN = 65;
            }
            else if (n >= 15 && n <= 16) {
                originalN = 70;
            }
            else if (n >= 17 && n <= 19) {
                originalN = 75;
            }
            else if (n >= 20 && n <= 21) {
                originalN = 80;
            }
            else if (n >= 22) {
                originalN = 85;
            }
            if (p <= 1) {
                originalP = 40;
            }
            else if (p === 2) {
                originalP = 45;
            }
            else if (p === 3) {
                originalP = 50;
            }
            else if (p === 4) {
                originalP = 55;
            }
            else if (p === 5) {
                originalP = 60;
            }
            else if (p >= 6 && p <= 7) {
                originalP = 65;
            }
            else if (p === 8) {
                originalP = 70;
            }
            else if (p === 9) {
                originalP = 75;
            }
            else if (p === 10) {
                originalP = 80;
            }
            else if (p === 11) {
                originalP = 85;
            }
            else if (p === 12) {
                originalP = 90;
            }
            else if (p === 13) {
                originalP = 95;
            }
            else if (p === 14) {
                originalP = 100;
            }
            else if (p === 15) {
                originalP = 105;
            }
            else if (p === 16) {
                originalP = 100;
            }
            else if (p >= 17) {
                originalP = 105;
            }
            if (l <= 2) {
                originalL = 15;
            }
            else if (l === 3 || l === 4) {
                originalL = 20;
            }
            else if (l === 5 || l === 6) {
                originalL = 25;
            }
            else if (l === 7 || l === 8) {
                originalL = 30;
            }
            else if (l >= 9 && l <= 11) {
                originalL = 35;
            }
            else if (l === 12 || l === 13) {
                originalL = 40;
            }
            else if (l === 14 || l === 15) {
                originalL = 45;
            }
            else if (l >= 16 && l <= 17) {
                originalL = 50;
            }
            else if (l === 18 || l === 19) {
                originalL = 55;
            }
            else if (l === 20 || l === 21) {
                originalL = 60;
            }
            else if (l >= 22) {
                originalL = 65;
            }
        }
        else if (age === 11) {
            if (e <= 2) {
                originalE = 10;
            }
            else if (e === 3 || e === 4) {
                originalE = 15;
            }
            else if (e === 5 || e === 6) {
                originalE = 20;
            }
            else if (e === 7 || e === 8) {
                originalE = 25;
            }
            else if (e >= 9 && e <= 10) {
                originalE = 30;
            }
            else if (e === 11 || e === 12) {
                originalE = 35;
            }
            else if (e === 13 || e === 14) {
                originalE = 40;
            }
            else if (e === 15 || e === 16) {
                originalE = 45;
            }
            else if (e === 17 || e === 18) {
                originalE = 50;
            }
            else if (e >= 19 && e <= 20) {
                originalE = 55;
            }
            else if (e === 21 || e === 22) {
                originalE = 60;
            }
            else if (e === 23 || e === 24) {
                originalE = 65;
            }
            else if (e >= 25) {
                originalE = 70;
            }
            if (n <= 2) {
                originalN = 35;
            }
            else if (n >= 3 && n <= 5) {
                originalN = 40;
            }
            else if (n >= 6 && n <= 7) {
                originalN = 45;
            }
            else if (n >= 8 && n <= 10) {
                originalN = 50;
            }
            else if (n >= 11 && n <= 12) {
                originalN = 55;
            }
            else if (n >= 13 && n <= 14) {
                originalN = 60;
            }
            else if (n >= 15 && n <= 17) {
                originalN = 65;
            }
            else if (n >= 18 && n <= 19) {
                originalN = 70;
            }
            else if (n >= 20 && n <= 22) {
                originalN = 75;
            }
            else if (n >= 23) {
                originalN = 80;
            }
            if (p <= 1) {
                originalP = 40;
            }
            else if (p === 2) {
                originalP = 45;
            }
            else if (p >= 3 && p <= 4) {
                originalP = 50;
            }
            else if (p === 5) {
                originalP = 55;
            }
            else if (p === 6) {
                originalP = 60;
            }
            else if (p >= 7 && p <= 8) {
                originalP = 65;
            }
            else if (p === 9) {
                originalP = 70;
            }
            else if (p === 10 || p === 11) {
                originalP = 75;
            }
            else if (p === 12) {
                originalP = 80;
            }
            else if (p === 13 || p === 14) {
                originalP = 85;
            }
            else if (p === 15) {
                originalP = 90;
            }
            else if (p >= 16 && p <= 17) {
                originalP = 95;
            }
            else if (p >= 18) {
                originalP = 100;
            }
            if (l <= 3) {
                originalL = 25;
            }
            else if (l === 4 || l === 5) {
                originalL = 30;
            }
            else if (l >= 6 && l <= 8) {
                originalL = 35;
            }
            else if (l >= 9 && l <= 11) {
                originalL = 40;
            }
            else if (l >= 12 && l <= 13) {
                originalL = 45;
            }
            else if (l >= 14 && l <= 16) {
                originalL = 50;
            }
            else if (l === 17 || l === 18) {
                originalL = 55;
            }
            else if (l === 19 || l === 20 || l === 21) {
                originalL = 60;
            }
            else if (l >= 22) {
                originalL = 65;
            }
        }
        else if (age === 12) {
            if (e <= 3) {
                originalE = 0;
            }
            else if (e === 4 || e === 5) {
                originalE = 5;
            }
            else if (e === 6) {
                originalE = 10;
            }
            else if (e === 7 || e === 8) {
                originalE = 15;
            }
            else if (e === 9 || e === 10) {
                originalE = 20;
            }
            else if (e === 11) {
                originalE = 25;
            }
            else if (e >= 12 && e <= 13) {
                originalE = 30;
            }
            else if (e === 14) {
                originalE = 35;
            }
            else if (e === 15 || e === 16) {
                originalE = 40;
            }
            else if (e === 17) {
                originalE = 45;
            }
            else if (e === 18 || e === 19) {
                originalE = 50;
            }
            else if (e === 20) {
                originalE = 55;
            }
            else if (e === 21 || e === 22) {
                originalE = 60;
            }
            else if (e === 23 || e === 24) {
                originalE = 65;
            }
            else if (e >= 25) {
                originalE = 70;
            }
            if (n <= 1) {
                originalN = 30;
            }
            else if (n >= 2 && n <= 4) {
                originalN = 35;
            }
            else if (n >= 5 && n <= 6) {
                originalN = 40;
            }
            else if (n >= 7 && n <= 8) {
                originalN = 45;
            }
            else if (n >= 9 && n <= 10) {
                originalN = 50;
            }
            else if (n >= 11 && n <= 13) {
                originalN = 55;
            }
            else if (n >= 14 && n <= 15) {
                originalN = 60;
            }
            else if (n >= 16 && n <= 17) {
                originalN = 65;
            }
            else if (n >= 18 && n <= 20) {
                originalN = 70;
            }
            else if (n >= 21 && n <= 22) {
                originalN = 75;
            }
            else if (n >= 23) {
                originalN = 80;
            }
            if (p <= 1) {
                originalP = 40;
            }
            else if (p === 2) {
                originalP = 45;
            }
            else if (p === 3) {
                originalP = 50;
            }
            else if (p === 4) {
                originalP = 55;
            }
            else if (p === 5) {
                originalP = 60;
            }
            else if (p === 6) {
                originalP = 65;
            }
            else if (p === 7) {
                originalP = 70;
            }
            else if (p === 8) {
                originalP = 75;
            }
            else if (p === 9) {
                originalP = 80;
            }
            else if (p === 10) {
                originalP = 85;
            }
            else if (p === 11 || p === 12) {
                originalP = 90;
            }
            else if (p === 13) {
                originalP = 95;
            }
            else if (p === 14) {
                originalP = 100;
            }
            else if (p === 15) {
                originalP = 105;
            }
            else if (p === 16) {
                originalP = 110;
            }
            else if (p === 17) {
                originalP = 115;
            }
            else if (p >= 18) {
                originalP = 120;
            }
            if (l === 1) {
                originalL = 20;
            }
            else if (l >= 2 && l <= 4) {
                originalL = 25;
            }
            else if (l === 5 || l === 6) {
                originalL = 30;
            }
            else if (l >= 7 && l <= 8) {
                originalL = 35;
            }
            else if (l === 9 || l === 10) {
                originalL = 40;
            }
            else if (l === 11 || l === 12) {
                originalL = 45;
            }
            else if (l >= 13 && l <= 14) {
                originalL = 50;
            }
            else if (l === 15 || l === 16) {
                originalL = 55;
            }
            else if (l >= 17 && l <= 19) {
                originalL = 60;
            }
            else if (l === 20 || l === 21) {
                originalL = 65;
            }
            else if (l >= 22) {
                originalL = 70;
            }
        }
        else if (age === 13) {
            if (e <= 2) {
                originalE = 10;
            }
            else if (e === 3 || e === 4) {
                originalE = 15;
            }
            else if (e >= 5 && e <= 6) {
                originalE = 20;
            }
            else if (e === 7 || e === 8) {
                originalE = 25;
            }
            else if (e === 9 || e === 10) {
                originalE = 30;
            }
            else if (e === 11 || e === 12) {
                originalE = 35;
            }
            else if (e >= 13 && e <= 14) {
                originalE = 40;
            }
            else if (e === 15 || e === 16) {
                originalE = 45;
            }
            else if (e === 17 || e === 18) {
                originalE = 50;
            }
            else if (e === 19 || e === 20) {
                originalE = 55;
            }
            else if (e === 21 || e === 22) {
                originalE = 60;
            }
            else if (e >= 23 && e <= 24) {
                originalE = 65;
            }
            else if (e >= 25) {
                originalE = 70;
            }
            if (n <= 1) {
                originalN = 30;
            }
            else if (n >= 2 && n <= 3) {
                originalN = 35;
            }
            else if (n >= 4 && n <= 6) {
                originalN = 40;
            }
            else if (n >= 7 && n <= 8) {
                originalN = 45;
            }
            else if (n >= 9 && n <= 11) {
                originalN = 50;
            }
            else if (n >= 12 && n <= 13) {
                originalN = 55;
            }
            else if (n >= 14 && n <= 15) {
                originalN = 60;
            }
            else if (n >= 16 && n <= 18) {
                originalN = 65;
            }
            else if (n >= 19 && n <= 20) {
                originalN = 70;
            }
            else if (n >= 21) {
                originalN = 75;
            }
            if (p <= 1) {
                originalP = 40;
            }
            else if (p === 2 || p === 3) {
                originalP = 45;
            }
            else if (p === 4) {
                originalP = 50;
            }
            else if (p === 5 || p === 6) {
                originalP = 55;
            }
            else if (p === 7) {
                originalP = 60;
            }
            else if (p === 8) {
                originalP = 65;
            }
            else if (p === 9 || p === 10) {
                originalP = 70;
            }
            else if (p === 11) {
                originalP = 75;
            }
            else if (p >= 12 && p <= 13) {
                originalP = 80;
            }
            else if (p === 14) {
                originalP = 85;
            }
            else if (p === 15) {
                originalP = 90;
            }
            else if (p >= 16 && p <= 17) {
                originalP = 95;
            }
            else if (p >= 18) {
                originalP = 100;
            }
            if (l <= 3) {
                originalL = 25;
            }
            else if (l === 4 || l === 5) {
                originalL = 30;
            }
            else if (l >= 6 && l <= 7) {
                originalL = 35;
            }
            else if (l >= 8 && l <= 10) {
                originalL = 40;
            }
            else if (l === 11 || l === 12) {
                originalL = 45;
            }
            else if (l >= 13 && l <= 15) {
                originalL = 50;
            }
            else if (l === 16 || l === 17) {
                originalL = 55;
            }
            else if (l >= 18 && l <= 20) {
                originalL = 60;
            }
            else if (l >= 21) {
                originalL = 65;
            }
        }
        else if (age === 14) {
            if (e <= 2) {
                originalE = 15;
            }
            else if (e === 3 || e === 4) {
                originalE = 20;
            }
            else if (e >= 5 && e <= 7) {
                originalE = 25;
            }
            else if (e >= 8 && e <= 9) {
                originalE = 30;
            }
            else if (e === 10 || e === 11) {
                originalE = 35;
            }
            else if (e === 12 || e === 13) {
                originalE = 40;
            }
            else if (e === 14 || e === 15) {
                originalE = 45;
            }
            else if (e === 16 || e === 17) {
                originalE = 50;
            }
            else if (e >= 18 && e <= 20) {
                originalE = 55;
            }
            else if (e === 21 || e === 22) {
                originalE = 60;
            }
            else if (e === 23 || e === 24) {
                originalE = 65;
            }
            else if (e >= 25) {
                originalE = 70;
            }
            if (n <= 3) {
                originalN = 35;
            }
            else if (n >= 4 && n <= 5) {
                originalN = 40;
            }
            else if (n >= 6 && n <= 8) {
                originalN = 45;
            }
            else if (n >= 9 && n <= 10) {
                originalN = 50;
            }
            else if (n >= 11 && n <= 13) {
                originalN = 55;
            }
            else if (n >= 14 && n <= 15) {
                originalN = 60;
            }
            else if (n >= 16 && n <= 17) {
                originalN = 65;
            }
            else if (n >= 18 && n <= 20) {
                originalN = 70;
            }
            else if (n === 21 || n === 22) {
                originalN = 75;
            }
            else if (n >= 23) {
                originalN = 80;
            }
            if (p <= 1) {
                originalP = 40;
            }
            else if (p === 2) {
                originalP = 45;
            }
            else if (p >= 3 && p <= 4) {
                originalP = 50;
            }
            else if (p === 5) {
                originalP = 55;
            }
            else if (p === 6) {
                originalP = 60;
            }
            else if (p === 7) {
                originalP = 65;
            }
            else if (p === 8) {
                originalP = 70;
            }
            else if (p === 9 || p === 10) {
                originalP = 75;
            }
            else if (p === 11) {
                originalP = 80;
            }
            else if (p === 12) {
                originalP = 85;
            }
            else if (p === 13) {
                originalP = 90;
            }
            else if (p === 14) {
                originalP = 95;
            }
            else if (p === 15 || p === 16) {
                originalP = 100;
            }
            else if (p === 17) {
                originalP = 105;
            }
            else if (p >= 18) {
                originalP = 110;
            }
            if (l <= 2) {
                originalL = 20;
            }
            else if (l === 3 || l === 4) {
                originalL = 25;
            }
            else if (l === 5 || l === 6) {
                originalL = 30;
            }
            else if (l >= 7 && l <= 8) {
                originalL = 35;
            }
            else if (l === 9 || l === 10) {
                originalL = 40;
            }
            else if (l === 11 || l === 12) {
                originalL = 45;
            }
            else if (l >= 13 && l <= 14) {
                originalL = 50;
            }
            else if (l === 15 || l === 16) {
                originalL = 55;
            }
            else if (l === 17 || l === 18) {
                originalL = 60;
            }
            else if (l === 19 || l === 20) {
                originalL = 65;
            }
            else if (l >= 21) {
                originalL = 70;
            }
        }
        else if (age === 15) {
            if (e <= 2) {
                originalE = 0;
            }
            else if (e === 3 || e === 4) {
                originalE = 5;
            }
            else if (e === 5) {
                originalE = 10;
            }
            else if (e === 6 || e === 7) {
                originalE = 15;
            }
            else if (e === 8 || e === 9) {
                originalE = 20;
            }
            else if (e === 10) {
                originalE = 25;
            }
            else if (e >= 11 && e <= 12) {
                originalE = 30;
            }
            else if (e === 13 || e === 14) {
                originalE = 35;
            }
            else if (e === 15) {
                originalE = 40;
            }
            else if (e === 16 || e === 17) {
                originalE = 45;
            }
            else if (e === 18) {
                originalE = 50;
            }
            else if (e >= 19 && e <= 20) {
                originalE = 55;
            }
            else if (e === 21 || e === 22) {
                originalE = 60;
            }
            else if (e === 23) {
                originalE = 65;
            }
            else if (e === 24) {
                originalE = 70;
            }
            else if (e >= 25) {
                originalE = 75;
            }
            if (n <= 2) {
                originalN = 35;
            }
            else if (n >= 3 && n <= 5) {
                originalN = 40;
            }
            else if (n >= 6 && n <= 8) {
                originalN = 45;
            }
            else if (n >= 9 && n <= 11) {
                originalN = 50;
            }
            else if (n >= 12 && n <= 14) {
                originalN = 55;
            }
            else if (n >= 15 && n <= 17) {
                originalN = 60;
            }
            else if (n >= 18 && n <= 20) {
                originalN = 65;
            }
            else if (n >= 21 && n <= 22) {
                originalN = 70;
            }
            else if (n >= 23) {
                originalN = 75;
            }
            if (p <= 1) {
                originalP = 40;
            }
            else if (p === 2) {
                originalP = 45;
            }
            else if (p >= 3 && p <= 4) {
                originalP = 50;
            }
            else if (p === 5) {
                originalP = 55;
            }
            else if (p === 6) {
                originalP = 60;
            }
            else if (p === 7) {
                originalP = 65;
            }
            else if (p === 8) {
                originalP = 70;
            }
            else if (p === 9) {
                originalP = 75;
            }
            else if (p === 10) {
                originalP = 80;
            }
            else if (p === 11 || p === 12) {
                originalP = 85;
            }
            else if (p === 13) {
                originalP = 90;
            }
            else if (p === 14) {
                originalP = 95;
            }
            else if (p === 15) {
                originalP = 100;
            }
            else if (p === 16) {
                originalP = 105;
            }
            else if (p === 17) {
                originalP = 110;
            }
            else if (p >= 18) {
                originalP = 115;
            }
            if (l <= 2) {
                originalL = 20;
            }
            else if (l === 3 || l === 4) {
                originalL = 25;
            }
            else if (l === 5 || l === 6) {
                originalL = 30;
            }
            else if (l >= 7 && l <= 8) {
                originalL = 35;
            }
            else if (l === 9 || l === 10) {
                originalL = 40;
            }
            else if (l === 11 || l === 12) {
                originalL = 45;
            }
            else if (l >= 13 && l <= 14) {
                originalL = 50;
            }
            else if (l === 15 || l === 16) {
                originalL = 55;
            }
            else if (l === 17 || l === 18) {
                originalL = 60;
            }
            else if (l === 19 || l === 20) {
                originalL = 65;
            }
            else if (l >= 21) {
                originalL = 70;
            }
        }
    }
    const result = {
        eTScore: String(originalE),
        nTScore: String(originalN),
        pTScore: String(originalP),
        lTScore: String(originalL),
    };
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            epq88ChildrenETScore: Number(result.eTScore),
            epq88ChildrenNTScore: Number(result.nTScore),
            epq88ChildrenPTScore: Number(result.pTScore),
            epq88ChildrenLTScore: Number(result.lTScore),
        },
    });
    return result;
};
exports.calculateEpqChildrenResult = calculateEpqChildrenResult;
