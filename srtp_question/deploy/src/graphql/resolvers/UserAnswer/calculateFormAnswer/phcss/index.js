"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePhcssResult = void 0;
const calculatePhcssResult = async (answer, db, userId) => {
    var _a, _b;
    const standardAnswers = [
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        0, // 80
    ];
    const component1Indexes = [
        12,
        13,
        14,
        21,
        22,
        25,
        34,
        35,
        38,
        45,
        48,
        56,
        59,
        62,
        78,
        80,
    ];
    const component2Indexes = [
        5,
        7,
        9,
        12,
        16,
        17,
        21,
        26,
        27,
        30,
        31,
        33,
        42,
        49,
        53,
        66,
        70,
    ];
    const component3Indexes = [5, 8, 15, 29, 33, 41, 49, 54, 57, 60, 63, 69, 73];
    const component4Indexes = [
        4,
        6,
        7,
        8,
        10,
        20,
        28,
        37,
        39,
        40,
        43,
        50,
        74,
        79,
    ];
    const component5Indexes = [1, 3, 6, 11, 40, 46, 49, 51, 58, 65, 69, 77];
    const component6Indexes = [2, 8, 36, 39, 43, 50, 52, 60, 67, 80];
    let component1 = 0;
    let component2 = 0;
    let component3 = 0;
    let component4 = 0;
    let component5 = 0;
    let component6 = 0;
    for (const index of component1Indexes) {
        const questionIndex = index - 1;
        if (answer.answers[questionIndex] === standardAnswers[questionIndex]) {
            component1 += 1;
        }
    }
    for (const index of component2Indexes) {
        const questionIndex = index - 1;
        if (answer.answers[questionIndex] === standardAnswers[questionIndex]) {
            component2 += 1;
        }
    }
    for (const index of component3Indexes) {
        const questionIndex = index - 1;
        if (answer.answers[questionIndex] === standardAnswers[questionIndex]) {
            component3 += 1;
        }
    }
    for (const index of component4Indexes) {
        const questionIndex = index - 1;
        if (answer.answers[questionIndex] === standardAnswers[questionIndex]) {
            component4 += 1;
        }
    }
    for (const index of component5Indexes) {
        const questionIndex = index - 1;
        if (answer.answers[questionIndex] === standardAnswers[questionIndex]) {
            component5 += 1;
        }
    }
    for (const index of component6Indexes) {
        const questionIndex = index - 1;
        if (answer.answers[questionIndex] === standardAnswers[questionIndex]) {
            component6 += 1;
        }
    }
    let total = 0;
    for (let index = 0; index < 80; index += 1) {
        if (answer.answers[index] === standardAnswers[index]) {
            total += 1;
        }
    }
    const updateRes = await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            phcss1: component1,
            phcss2: component2,
            phcss3: component3,
            phcss4: component4,
            phcss5: component5,
            phcss6: component6,
            phcssTotal: total,
        },
    });
    return {
        phcss1: component1,
        phcss2: component2,
        phcss3: component3,
        phcss4: component4,
        phcss5: component5,
        phcss6: component6,
        phcssTotal: total,
        userAge: (_a = updateRes.value) === null || _a === void 0 ? void 0 : _a.age,
        userGender: (_b = updateRes.value) === null || _b === void 0 ? void 0 : _b.gender,
    };
};
exports.calculatePhcssResult = calculatePhcssResult;
