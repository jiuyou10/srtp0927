"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientResolvers = void 0;
const mongodb_1 = require("mongodb");
const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: process.env.NODE_ENV === "deployment" ? true : false,
};
const logInViaUserName = async (input, db, res, req) => {
    if (!input) {
        return undefined;
    }
    const user = await db.users.findOne({ userName: input.userName });
    const updateRes = user
        ? await db.users.findOneAndUpdate({ userName: input.userName }, {
            $set: {
                ...input,
                ...(input.age === undefined ? { age: undefined } : {}),
            },
        }, { returnOriginal: false, upsert: true })
        : await db.users.findOneAndUpdate({ userName: input.userName }, {
            $set: {
                ...input,
                doctor: new mongodb_1.ObjectId(req.signedCookies.doctor),
                signUpDate: new Date(),
            },
        }, { returnOriginal: false, upsert: true });
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
const logInViaCookie = async (db, req, res) => {
    const user = await db.users.findOne({
        _id: new mongodb_1.ObjectId(req.signedCookies.patient),
    });
    if (!user) {
        res.clearCookie("patient", cookieOptions);
        return;
    }
    return user;
};
exports.patientResolvers = {
    Mutation: {
        patientLogIn: async (_root, { input }, { db, req, res }) => {
            try {
                const userName = input ? input.userName : null;
                const user = userName
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
            }
            catch (error) {
                throw new Error(`Failed to log in this patient: ${error}`);
            }
        },
        patientLogOut: (_root, _args, { res }) => {
            res.clearCookie("patient", cookieOptions);
            return {
                didRequest: true,
            };
        },
    },
};
