import { Database } from "../../../lib/type";
import {
  AddDoctorInput,
  DoctorList,
  DoctorListArgs,
  OperationResult,
} from "./type";

export const doctorListResolvers = {
  Query: {
    doctorList: async (
      _root: undefined,
      args: DoctorListArgs,
      { db }: { db: Database }
    ): Promise<DoctorList> => {
      try {
        let doctorsCursor = await db.admins.find({});
        doctorsCursor = doctorsCursor.skip(
          args.currentPageIndex > 0 ? args.currentPageIndex * args.limit : 0
        );
        doctorsCursor = doctorsCursor.sort({ signUpDate: -1 });
        doctorsCursor = doctorsCursor.limit(args.limit);
        const total = await doctorsCursor.count();
        const doctorsArray = await doctorsCursor.toArray();
        const returnedDoctorsArray = doctorsArray.map((doctor) => ({
          name: doctor.name,
          userName: doctor.userName,
        }));
        return {
          total,
          admins: returnedDoctorsArray,
        };
      } catch (e) {
        throw e;
      }
    },
    checkIfDoctorUserNameUnique: async (
      _root: undefined,
      args: { userName: string },
      { db }: { db: Database }
    ): Promise<OperationResult> => {
      const doctorsCursor = await db.admins.find({ userName: args.userName });
      if ((await doctorsCursor.toArray()).length > 0) {
        return { result: false };
      }
      return { result: true };
    },
  },
  Mutation: {
    addDoctor: async (
      _root: undefined,
      args: AddDoctorInput,
      { db }: { db: Database }
    ): Promise<OperationResult> => {
      console.log(args);
      const doctorsCursor = await db.admins.find({
        userName: args.input.userName,
      });
      if ((await doctorsCursor.toArray()).length > 0) {
        throw new Error("A doctor with same user name already exists!");
      }
      await db.admins.insertOne({
        userName: args.input.userName,
        password: args.input.password,
        name: args.input.name,
        catelogy: "Admin",
        signUpDate: new Date(),
      });
      return { result: true };
    },
  },
};
