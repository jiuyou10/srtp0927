"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCPSSResult = void 0;
const calculateCPSSResult = async (answer, db, userId) => {
    let total = 0;
    for (const choice of answer.answers) {
        total += choice;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            CPSSTotal: total,
        },
    });
    return total;
};
exports.calculateCPSSResult = calculateCPSSResult;
