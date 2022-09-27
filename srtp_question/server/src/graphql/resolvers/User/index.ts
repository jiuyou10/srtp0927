import { IResolvers } from "apollo-server-express";
import { AdminWithId, Database, UserWithId } from "../../../lib/type";
import { UserArgs } from "./types";
import { Request } from "express";
import { ObjectId } from "mongodb";

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db }: { db: Database; req: Request }
    ): Promise<UserWithId | AdminWithId> => {
      try {
        const admin = await db.admins.findOne<AdminWithId>({
          _id: new ObjectId(id),
        });
        if (admin) {
          return admin;
        }
        const user = await db.users.findOne<UserWithId>({
          _id: new ObjectId(id),
        });
        if (!user) {
          throw new Error("User can't be found");
        }
        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
  },
  UserOrAdmin: {
    __resolveType(adminOrUser: AdminWithId | UserWithId) {
      if (adminOrUser.catelogy === "Admin") {
        return "Admin";
      } else if (adminOrUser.catelogy === "User") {
        return "User";
      }
      return null;
    },
  },
  Admin: {
    id: (admin: AdminWithId): string => {
      return admin._id.toHexString();
    },
  },
  User: {
    id: (user: UserWithId): string => {
      return user._id.toHexString();
    },
  },
};
