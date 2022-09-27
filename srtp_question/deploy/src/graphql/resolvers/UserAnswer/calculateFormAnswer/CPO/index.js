"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCPOResult = void 0;
const calculateCPOResult = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            CPOTotal: total,
        },
    });
    return total;
};
exports.calculateCPOResult = calculateCPOResult;
