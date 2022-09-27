"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePsssResult = void 0;
const P_INDEXES = [5, 10, 11, 12, 17, 21, 25];
const calculatePsssResult = async (answer, db, userId) => {
    var _a;
    let total = 0;
    let p = 0;
    let s = 0;
    for (let i = 0; i < answer.answers.length; i++) {
        const choice = answer.answers[i];
        if (P_INDEXES.includes(i + 1)) {
            p += choice;
        }
        else {
            s += choice;
        }
        total += choice;
    }
    const updateRes = await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            psssP: p,
            psssS: s,
            psssTotal: total,
        },
    });
    return {
        psssP: p,
        psssS: s,
        psssTotal: total,
        userGender: (_a = updateRes.value) === null || _a === void 0 ? void 0 : _a.gender,
    };
};
exports.calculatePsssResult = calculatePsssResult;
