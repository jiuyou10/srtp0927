"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHAMDResult = void 0;
const calculateHAMDResult = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            HAMDTotal: total,
        },
    });
    return total;
};
exports.calculateHAMDResult = calculateHAMDResult;
