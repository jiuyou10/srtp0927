"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateASRSResult = void 0;
const calculateASRSResult = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    total /= 2;
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            ASRSTotal: total,
        },
    });
    return total;
};
exports.calculateASRSResult = calculateASRSResult;
