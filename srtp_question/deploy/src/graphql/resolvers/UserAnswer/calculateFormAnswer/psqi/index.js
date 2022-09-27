"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePsqiResult = void 0;
const calculatePsqiResult = async (answer, db, userId) => {
    let psqiA = 0;
    let psqiB = 0;
    let psqiC = 0;
    let psqiD = 0;
    let psqiE = 0;
    let psqiF = 0;
    let psqiG = 0;
    // A
    psqiA = answer.answers[14];
    // B
    if (answer.answers[1] <= 15) {
        // Question 2
        psqiB += 0;
    }
    else if (answer.answers[1] >= 16 && answer.answers[1] <= 30) {
        psqiB += 1;
    }
    else if (answer.answers[1] >= 31 && answer.answers[1] <= 60) {
        psqiB += 2;
    }
    else if (answer.answers[1] > 60) {
        psqiB += 3;
    }
    psqiB += answer.answers[4]; // Question 5a
    switch (psqiB) {
        case 0: {
            psqiB = 0;
            break;
        }
        case 1:
        case 2: {
            psqiB = 1;
            break;
        }
        case 3:
        case 4: {
            psqiB = 2;
            break;
        }
        case 5:
        case 6: {
            psqiB = 3;
            break;
        }
    }
    // C
    // Qustion 4
    if (answer.answers[3] > 7) {
        psqiC = 0;
    }
    else if (answer.answers[3] >= 6) {
        psqiC = 1;
    }
    else if (answer.answers[3] >= 5) {
        psqiC = 2;
    }
    else {
        psqiC = 3;
    }
    // D
    // Time to sleep. (0 - 23)
    let timeToSleep = answer.answers[0] === 24 ? 0 : answer.answers[0];
    // Time to get up. (0 - 23)
    const timeToGetUp = answer.answers[2] === 24 ? 0 : answer.answers[2];
    let timeInBed = null;
    // Say one person sleeps at 8, i.e. he sleeps at 20:00 pm.
    if (timeToSleep >= 6 && timeToSleep <= 12) {
        timeToSleep = timeToSleep + 12;
    }
    if (timeToGetUp >= 0 &&
        timeToGetUp <= 12 &&
        timeToSleep >= 18 &&
        timeToSleep <= 24) {
        timeInBed = timeToGetUp + 24 - timeToSleep;
    }
    else if (timeToGetUp >= 0 &&
        timeToGetUp <= 12 &&
        timeToSleep >= 0 &&
        timeToSleep < 6) {
        timeInBed = timeToGetUp - timeToSleep;
    }
    if (timeInBed === null) {
        throw new Error("Cannot calculate time in bed!");
    }
    const actualSleepTime = answer.answers[3];
    const sleepEfficiency = actualSleepTime / timeInBed;
    if (sleepEfficiency >= 0.85) {
        psqiD = 0;
    }
    else if (sleepEfficiency >= 0.75) {
        psqiD = 1;
    }
    else if (sleepEfficiency >= 0.65) {
        psqiD = 2;
    }
    else {
        psqiD = 3;
    }
    // E
    let eTotal = 0;
    for (let i = 5; i <= 13; i++) {
        eTotal += answer.answers[i];
    }
    if (eTotal === 0) {
        psqiE = 0;
    }
    else if (eTotal <= 9) {
        psqiE = 1;
    }
    else if (eTotal <= 18) {
        psqiE = 2;
    }
    else if (eTotal <= 27) {
        psqiE = 3;
    }
    // F
    psqiF = answer.answers[15];
    // G
    const gTotal = answer.answers[16] + answer.answers[17];
    if (gTotal === 0) {
        psqiG = 0;
    }
    else if (gTotal <= 2) {
        psqiG = 1;
    }
    else if (gTotal <= 4) {
        psqiG = 2;
    }
    else if (gTotal <= 6) {
        psqiG = 3;
    }
    const psqiTotal = psqiA + psqiB + psqiC + psqiD + psqiE + psqiF + psqiG;
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            psqiA,
            psqiB,
            psqiC,
            psqiD,
            psqiE,
            psqiF,
            psqiG,
            psqiTotal,
        },
    });
    return {
        psqiA,
        psqiB,
        psqiC,
        psqiD,
        psqiE,
        psqiF,
        psqiG,
        psqiTotal,
    };
};
exports.calculatePsqiResult = calculatePsqiResult;
