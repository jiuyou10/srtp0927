import { IResolvers } from "apollo-server-express";
import { Database } from "../../../lib/type";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { AddDiagnosisInput } from "./type";
import { OperationResult } from "../DoctorList/type";

export const addDiagnosisResolvers: IResolvers = {
  Mutation: {
    addDiagnosis: async (
      _root: undefined,
      { input }: AddDiagnosisInput,
      { db }: { db: Database; req: Request }
    ): Promise<OperationResult> => {
      const { patientId, diagnosis } = input;
      const updateRes = await db.users.findOneAndUpdate(
        { _id: new ObjectId(patientId) },
        {
          $set: {
            diagnosis,
          },
        },
        { returnOriginal: false }
      );
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
