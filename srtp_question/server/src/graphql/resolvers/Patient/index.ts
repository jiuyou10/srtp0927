import { IResolvers } from "apollo-server-express";
import { Request, Response } from "express";
import {
  Database,
  DoctorReturned,
  UserViewer,
  UserWithId,
} from "../../../lib/type";
import { PatientLoginArgs } from "./type";
import { ObjectId } from "mongodb";

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "deployment" ? true : false,
};

const logInViaUserName = async (
  input: PatientLoginArgs["input"],
  db: Database,
  res: Response,
  req: Request
): Promise<UserWithId | undefined> => {
  if (!input) {
    return undefined;
  }
  const user = await db.users.findOne({ userName: input.userName });
  const updateRes = user
    ? await db.users.findOneAndUpdate(
        { userName: input.userName },
        {
          $set: {
            ...input,
            ...(input.age === undefined ? { age: undefined } : {}),
          },
        },
        { returnOriginal: false, upsert: true }
      )
    : await db.users.findOneAndUpdate(
        { userName: input.userName },
        {
          $set: {
            ...input,
            doctor: new ObjectId(req.signedCookies.doctor),
            signUpDate: new Date(),
          },
        },
        { returnOriginal: false, upsert: true }
      );
  if (updateRes.value) {
    const patient = updateRes.value;
    const userId = patient._id;
    if (patient) {
      res.cookie("patient", userId.toHexString(), {
        ...cookieOptions,
        maxAge: 0.5 * 24 * 60 * 60 * 1000,
      });
      return patient;
    }
  }
  throw new Error("Name not corrent!");
};

const logInViaCookie = async (
  db: Database,
  req: Request,
  res: Response
): Promise<UserWithId | undefined> => {
  const user = await db.users.findOne<UserWithId>({
    _id: new ObjectId(req.signedCookies.patient),
  });
  if (!user) {
    res.clearCookie("patient", cookieOptions);
    return;
  }
  return user;
};

export const patientResolvers: IResolvers = {
  Mutation: {
    patientLogIn: async (
      _root: undefined,
      { input }: PatientLoginArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<UserViewer> => {
      try {
        const userName = input ? input.userName : null;
        const user: UserWithId | undefined = userName
          ? await logInViaUserName(input, db, res, req)
          : await logInViaCookie(db, req, res);
        if (!user) {
          return {
            didRequest: true,
            catelogy: "User",
          };
        }
        return {
          userName: user.userName,
          name: user.name,
          didRequest: true,
          gender: user.gender,
          age: user.age,
          education: user.education,
          jobStatus: user.jobStatus,
          marriageStatus: user.marriageStatus,
          catelogy: "User",
        };
      } catch (error) {
        throw new Error(`Failed to log in this patient: ${error}`);
      }
    },
    patientLogOut: (
      _root: undefined,
      _args,
      { res }: { res: Response }
    ): DoctorReturned => {
      res.clearCookie("patient", cookieOptions);
      return {
        didRequest: true,
      };
    },
  },
};
