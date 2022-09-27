"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateYaleBrownResult = void 0;
const calculateYaleBrownResult = async (answer, db, userId) => {
    let total = 0;
    let mind = 0;
    let behavior = 0;
    for (let i = 0; i < answer.answers.length; i++) {
        const choice = answer.answers[i];
        if (i <= 4) {
            mind += choice;
        }
        else {
            behavior += choice;
        }
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            yaleBrownMind: mind,
            yaleBrownBehavior: behavior,
            yaleBrownTotal: total,
        },
    });
    return {
        yaleBrownMind: mind,
        yaleBrownBehavior: behavior,
        yaleBrownTotal: total,
    };
};
exports.calculateYaleBrownResult = calculateYaleBrownResult;
