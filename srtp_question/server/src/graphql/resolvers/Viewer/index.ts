import { IResolvers } from "apollo-server-express";
import { Request, Response } from "express";
import {
  AdminWithId,
  Database,
  UserViewer,
  UserWithDate,
  UserWithId,
  Viewer,
} from "../../../lib/type";
import { CreateAccountArgs, LogInArgs } from "./type";
import crypto from "crypto";
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
  token: string,
  db: Database,
  res: Response
): Promise<UserWithId | AdminWithId> => {
  // Find if an admin exists.
  const admin = await db.admins.findOne<AdminWithId>({
    userName,
    password,
  });
  if (admin) {
    const userId = admin._id;
    const updateRes = await db.admins.findOneAndUpdate(
      { _id: userId },
      { $set: { token } },
      {
        returnOriginal: false,
      }
    );
    const viewer = updateRes.value as AdminWithId;
    res.cookie("viewer", userId.toHexString(), {
      ...cookieOptions,
      maxAge: 0.5 * 24 * 60 * 60 * 1000,
    });
    return viewer;
  }
  const user = await db.users.findOne<UserWithId>({
    userName,
    password,
  });
  if (!user) {
    throw new Error("Name or password not correct");
  }
  const userNameFound = user.userName;
  const userPassword = user.password;
  const userId = user._id;
  if (!userNameFound || !userPassword || !userId) {
    throw new Error("Password login error");
  }
  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        token,
      },
    },
    {
      returnOriginal: false,
    }
  );

  const viewer = updateRes.value as UserWithId;
  res.cookie("viewer", userId.toHexString(), {
    ...cookieOptions,
    maxAge: 0.5 * 24 * 60 * 60 * 1000,
  });
  return viewer;
};

const logInViaCookie = async (
  token: string,
  db: Database,
  req: Request,
  res: Response
): Promise<UserWithId | AdminWithId | undefined> => {
  const adminUpdateRes = await db.admins.findOneAndUpdate(
    { _id: new ObjectId(req.signedCookies.viewer) },
    { $set: { token } },
    { returnOriginal: false }
  );
  if (adminUpdateRes.value) {
    const viewer = adminUpdateRes.value;
    if (!viewer) {
      res.clearCookie("viewer", cookieOptions);
      return;
    }
    return viewer as AdminWithId;
  }
  const updateRes = await db.users.findOneAndUpdate(
    { _id: new ObjectId(req.signedCookies.viewer) },
    { $set: { token } },
    { returnOriginal: false }
  );
  const viewer = updateRes.value;
  console.log(viewer);
  if (!viewer) {
    res.clearCookie("viewer", cookieOptions);
    return;
  }
  return viewer as UserWithId;
};

export const viewerResolvers: IResolvers = {
  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db, req, res }: { db: Database; res: Response; req: Request }
    ): Promise<Viewer> => {
      try {
        const userName = input ? input.userName : null;
        const password = input ? input.password : null;
        const token = crypto.randomBytes(16).toString("hex");
        const viewer: UserWithId | AdminWithId | undefined =
          userName && password
            ? await logInViaPassword(userName, password, token, db, res)
            : await logInViaCookie(token, db, req, res);
        if (!viewer) {
          return {
            didRequest: true,
            catelogy: "User",
          };
        }
        if (viewer.catelogy === "Admin") {
          return {
            _id: viewer._id.toHexString(),
            userName: viewer.userName,
            token: viewer.token,
            didRequest: true,
            catelogy: "Admin",
            name: viewer.name,
          };
        }
        return {
          _id: viewer._id.toHexString(),
          userName: viewer.userName,
          token: viewer.token,
          didRequest: true,
          name: viewer.name,
          age: viewer.age,
          gender: viewer.gender,
          marriageStatus: viewer.marriageStatus,
          jobStatus: viewer.jobStatus,
          education: viewer.education,
          catelogy: "User",
        };
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
      }
    },
    logOut: (_root: undefined, _args, { res }: { res: Response }): Viewer => {
      res.clearCookie("viewer", cookieOptions);
      return {
        didRequest: true,
        catelogy: "User",
      };
    },
    createAccount: async (
      _root: undefined,
      { input }: CreateAccountArgs,
      { db, req, res }: { db: Database; res: Response; req: Request }
    ): Promise<UserViewer> => {
      try {
        const {
          userName,
          name,
          jobStatus,
          gender,
          age,
          marriageStatus,
          password,
          education,
        } = input;
        const user = await db.users.findOne({ userName });
        if (user) {
          throw new Error("One user with this userName already exists.");
        }
        const token = crypto.randomBytes(16).toString("hex");
        const userData: UserWithDate = {
          userName,
          name,
          jobStatus,
          gender,
          age,
          marriageStatus,
          education,
          token,
          password,
          catelogy: "User",
          signUpDate: new Date(),
          doctor: new ObjectId(req.signedCookies.doctor),
        };
        const necessaryFields = ["userName", "name", "password"];
        for (const [field, value] of Object.entries(userData)) {
          if (value === "" || value === undefined || value === null) {
            if (necessaryFields.indexOf(field) !== -1) {
              throw new Error(`${field} should not be empty!`);
            }
            (userData as any)[field] = undefined;
          }
        }
        const writeOpResult = await db.users.insertOne({
          ...userData,
        });
        const id = writeOpResult.insertedId.toHexString();
        res.cookie("viewer", id, {
          ...cookieOptions,
          maxAge: 0.5 * 24 * 60 * 60 * 1000,
        });
        return {
          ...userData,
          _id: id,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to create account: ${error}`);
      }
    },
  },
  Viewer: {
    __resolveType(viewer: Viewer) {
      if (viewer.catelogy === "User") {
        return "UserViewer";
      } else if (viewer.catelogy === "Admin") {
        return "AdminViewer";
      }
      return null;
    },
  },
  UserViewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    },
  },
  AdminViewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    },
  },
};
