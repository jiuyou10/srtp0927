"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHcl32Result = void 0;
const calculateHcl32Result = async (answer, db, userId) => {
    let total = 0;
    for (let i = 0; i < answer.answers.length; i++) {
        const choice = answer.answers[i];
        total += choice === 0 ? 1 : 0;
    }
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            hcl32Total: total,
        },
    });
    return total;
};
exports.calculateHcl32Result = calculateHcl32Result;
