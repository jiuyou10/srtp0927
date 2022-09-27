"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHAMSResult = void 0;
const calculateHAMSResult = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            HAMSTotal: total,
        },
    });
    return total;
};
exports.calculateHAMSResult = calculateHAMSResult;
