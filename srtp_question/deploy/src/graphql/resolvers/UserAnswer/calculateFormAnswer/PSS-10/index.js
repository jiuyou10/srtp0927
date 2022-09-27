"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePSS10Result = void 0;
const calculatePSS10Result = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += +choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            PSS10Total: total,
        },
    });
    return total;
};
exports.calculatePSS10Result = calculatePSS10Result;
