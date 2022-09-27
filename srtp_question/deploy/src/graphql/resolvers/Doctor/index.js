"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorResolvers = void 0;
const mongodb_1 = require("mongodb");
const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: process.env.NODE_ENV === "deployment" ? true : false,
};
const logInViaPassword = async (userName, password, db, res) => {
    const admin = await db.admins.findOne({ userName, password });
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
const logInViaCookie = async (db, req, res) => {
    const admin = await db.admins.findOne({
        _id: new mongodb_1.ObjectId(req.signedCookies.doctor),
    });
    if (!admin) {
        res.clearCookie("doctor", cookieOptions);
        return;
    }
    return admin;
};
exports.doctorResolvers = {
    Mutation: {
        doctorLogIn: async (_root, { input }, { db, req, res }) => {
            try {
                const userName = input ? input.userName : null;
                const password = input ? input.password : null;
                const doctor = userName && password
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
            }
            catch (error) {
                throw new Error(`Failed to log in this doctor: ${error}`);
            }
        },
        doctorLogOut: (_root, _args, { res }) => {
            res.clearCookie("doctor", cookieOptions);
            return {
                didRequest: true,
            };
        },
    },
};
