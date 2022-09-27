"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMdqResult = void 0;
const calculateMdqResult = async (answer, db, userId) => {
    let total = 0;
    for (let i = 0; i < 13; i++) {
        const choice = answer.answers[i];
        total += choice === 0 ? 1 : 0;
    }
    const isMdqTwoSituationsHappenAtSameTime = answer.answers[13] === 0;
    const mdqInfluence = answer.answers[14];
    await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            mdqTotal: total,
            isMdqTwoSituationsHappenAtSameTime,
            mdqInfluence,
        },
    });
    return {
        mdqTotal: total,
        isMdqTwoSituationsHappenAtSameTime,
        mdqInfluence,
    };
};
exports.calculateMdqResult = calculateMdqResult;
