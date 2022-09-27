"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNTTResult = void 0;
const calculateNTTResult = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            NTTTotal: total,
        },
    });
    return total;
};
exports.calculateNTTResult = calculateNTTResult;
