"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGad7Result = void 0;
const calculateGad7Result = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            gad7Total: total,
        },
    });
    return total;
};
exports.calculateGad7Result = calculateGad7Result;
