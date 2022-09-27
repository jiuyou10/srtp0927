"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEmbuResult = void 0;
const calculateEmbuResult = async (answer, db, userId) => {
    let isFatherAnswerCompleted = true;
    let isMotherAnswerCompleted = true;
    for (let i = 0; i < answer.answers.length / 2; i++) {
        if (i % 2 === 0) {
            // Father.
            if (answer.answers[i] === -1) {
                isFatherAnswerCompleted = false;
            }
        }
        else {
            if (answer.answers[i] === -1) {
                isMotherAnswerCompleted = false;
            }
        }
    }
    const fatherComponents = [0, 0, 0, 0, 0, 0];
    const motherComponents = [0, 0, 0, 0, 0];
    const fatherComponentsIndexes = [
        [2, 4, 6, 7, 9, 15, -20, 25, 29, 30, 31, 32, 33, 37, 42, 54, 60, 61, 66],
        [5, 13, 17, 18, 43, 49, 51, 52, 53, 55, 58, 62],
        [1, 10, 11, 14, 27, 36, 48, -50, -56, 57],
        [3, 8, 22, 64, 65],
        [21, 23, 28, 34, 35, 45],
        [12, 16, 39, 40, 59],
    ];
    const motherComponentsIndexes = [
        [2, 4, 6, 7, 9, 15, 25, 29, 30, 31, 32, 33, 37, 42, 44, 54, 60, 61, 63],
        [1, 11, 12, 14, 16, 19, 24, 27, 35, 36, 41, 48, -50, -56, 57, 59],
        [23, 26, 28, 34, 38, 39, 45, 47],
        [13, 17, 43, 51, 52, 53, 55, 58, 62],
        [3, 8, 22, 64, 65],
    ];
    if (isFatherAnswerCompleted) {
        for (let i = 0; i < fatherComponents.length; i++) {
            for (let currentQuestionIndex = 0; currentQuestionIndex < fatherComponentsIndexes[i].length; currentQuestionIndex += 1) {
                const actualChoice = answer.answers[(Math.abs(fatherComponentsIndexes[i][currentQuestionIndex]) - 1) * 2]; // 0 - 3.
                if (fatherComponentsIndexes[i][currentQuestionIndex] < 0) {
                    // 0 1 2 3
                    // ->
                    // 4 3 2 1
                    fatherComponents[i] += 4 - actualChoice;
                }
                else {
                    fatherComponents[i] += actualChoice + 1;
                }
            }
        }
    }
    if (isMotherAnswerCompleted) {
        for (let i = 0; i < motherComponents.length; i++) {
            for (let currentQuestionIndex = 0; currentQuestionIndex < motherComponentsIndexes[i].length; currentQuestionIndex += 1) {
                const actualChoice = answer.answers[(Math.abs(motherComponentsIndexes[i][currentQuestionIndex]) - 1) *
                    2 +
                    1];
                if (motherComponentsIndexes[i][currentQuestionIndex] < 0) {
                    motherComponents[i] = 4 - actualChoice;
                }
                else {
                    motherComponents[i] += actualChoice + 1;
                }
            }
        }
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            embuFatherComponents: fatherComponents,
            embuIsFatherAnswerCompleted: isFatherAnswerCompleted,
            embuIsMotherAnswerCompleted: isMotherAnswerCompleted,
            embuMotherComponents: motherComponents,
        },
    });
    return {
        embuFatherComponents: fatherComponents,
        embuIsFatherAnswerCompleted: isFatherAnswerCompleted,
        embuIsMotherAnswerCompleted: isMotherAnswerCompleted,
        embuMotherComponents: motherComponents,
    };
};
exports.calculateEmbuResult = calculateEmbuResult;
