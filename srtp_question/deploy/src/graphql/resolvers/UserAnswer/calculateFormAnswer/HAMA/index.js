"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHAMAResult = void 0;
const calculateHAMAResult = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            HAMATotal: total,
        },
    });
    return total;
};
exports.calculateHAMAResult = calculateHAMAResult;
