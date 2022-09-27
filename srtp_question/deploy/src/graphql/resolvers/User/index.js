"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.userResolvers = {
    Query: {
        user: async (_root, { id }, { db }) => {
            try {
                const admin = await db.admins.findOne({
                    _id: new mongodb_1.ObjectId(id),
                });
                if (admin) {
                    return admin;
                }
                const user = await db.users.findOne({
                    _id: new mongodb_1.ObjectId(id),
                });
                if (!user) {
                    throw new Error("User can't be found");
                }
                return user;
            }
            catch (error) {
                throw new Error(`Failed to query user: ${error}`);
            }
        },
    },
    UserOrAdmin: {
        __resolveType(adminOrUser) {
            if (adminOrUser.catelogy === "Admin") {
                return "Admin";
            }
            else if (adminOrUser.catelogy === "User") {
                return "User";
            }
            return null;
        },
    },
    Admin: {
        id: (admin) => {
            return admin._id.toHexString();
        },
    },
    User: {
        id: (user) => {
            return user._id.toHexString();
        },
    },
};
