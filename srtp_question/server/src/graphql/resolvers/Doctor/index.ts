import { IResolvers } from "apollo-server-express";
import { Request, Response } from "express";
import { AdminWithId, Database, DoctorReturned } from "../../../lib/type";
import { DoctorLoginArgs } from "./type";
import { ObjectId } from "mongodb";

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "deployment" ? true : false,
};

const logInViaPassword = async (
  userName: string,
  password: string,
  db: Database,
  res: Response
): Promise<AdminWithId> => {
  const admin = await db.admins.findOne<AdminWithId>({ userName, password });
  if (admin) {
    const userId = admin._id;
    const doctor = admin;
    if (doctor) {
      res.cookie("doctor", userId.toHexString(), {
        ...cookieOptions,
        maxAge: 0.5 * 24 * 60 * 60 * 1000,
      });
      return doctor;
    }
  }
  throw new Error("Name or password not corrent!");
};

const logInViaCookie = async (
  db: Database,
  req: Request,
  res: Response
): Promise<AdminWithId | undefined> => {
  const admin = await db.admins.findOne<AdminWithId>({
    _id: new ObjectId(req.signedCookies.doctor),
  });
  if (!admin) {
    res.clearCookie("doctor", cookieOptions);
    return;
  }
  return admin;
};

export const doctorResolvers: IResolvers = {
  Mutation: {
    doctorLogIn: async (
      _root: undefined,
      { input }: DoctorLoginArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<DoctorReturned> => {
      try {
        const userName = input ? input.userName : null;
        const password = input ? input.password : null;
        const doctor: AdminWithId | undefined =
          userName && password
            ? await logInViaPassword(userName, password, db, res)
            : await logInViaCookie(db, req, res);
        if (!doctor) {
          return {
            didRequest: true,
          };
        }
        return {
          userName: doctor.userName,
          name: doctor.name,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to log in this doctor: ${error}`);
      }
    },
    doctorLogOut: (
      _root: undefined,
      _args,
      { res }: { res: Response }
    ): DoctorReturned => {
      res.clearCookie("doctor", cookieOptions);
      return {
        didRequest: true,
      };
    },
  },
};
