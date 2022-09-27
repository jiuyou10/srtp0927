"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDiagnosisResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.addDiagnosisResolvers = {
    Mutation: {
        addDiagnosis: async (_root, { input }, { db }) => {
            const { patientId, diagnosis } = input;
            const updateRes = await db.users.findOneAndUpdate({ _id: new mongodb_1.ObjectId(patientId) }, {
                $set: {
                    diagnosis,
                },
            }, { returnOriginal: false });
            console.log(updateRes.value);
            if (!updateRes.ok) {
                throw new Error("User not found");
            }
            return {
                result: true,
            };
        },
    },
};
