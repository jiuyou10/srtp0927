"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEpdsResult = void 0;
const calculateEpdsResult = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            epdsTotal: total,
        },
    });
    return total;
};
exports.calculateEpdsResult = calculateEpdsResult;
