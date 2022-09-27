"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePhq7Result = void 0;
const calculatePhq7Result = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, { $set: { phq9Total: total } });
    return total;
};
exports.calculatePhq7Result = calculatePhq7Result;
