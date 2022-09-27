"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePTEDResult = void 0;
const calculatePTEDResult = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            PTEDTotal: total,
        },
    });
    return total;
};
exports.calculatePTEDResult = calculatePTEDResult;
