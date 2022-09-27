"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewerResolvers = void 0;
const crypto_1 = __importDefault(require("crypto"));
const mongodb_1 = require("mongodb");
const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: process.env.NODE_ENV === "deployment" ? true : false,
};
const logInViaPassword = async (userName, password, token, db, res) => {
    // Find if an admin exists.
    const admin = await db.admins.findOne({
        userName,
        password,
    });
    if (admin) {
        const userId = admin._id;
        const updateRes = await db.admins.findOneAndUpdate({ _id: userId }, { $set: { token } }, {
            returnOriginal: false,
        });
        const viewer = updateRes.value;
        res.cookie("viewer", userId.toHexString(), {
            ...cookieOptions,
            maxAge: 0.5 * 24 * 60 * 60 * 1000,
        });
        return viewer;
    }
    const user = await db.users.findOne({
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
    const updateRes = await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            token,
        },
    }, {
        returnOriginal: false,
    });
    const viewer = updateRes.value;
    res.cookie("viewer", userId.toHexString(), {
        ...cookieOptions,
        maxAge: 0.5 * 24 * 60 * 60 * 1000,
    });
    return viewer;
};
const logInViaCookie = async (token, db, req, res) => {
    const adminUpdateRes = await db.admins.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.signedCookies.viewer) }, { $set: { token } }, { returnOriginal: false });
    if (adminUpdateRes.value) {
        const viewer = adminUpdateRes.value;
        if (!viewer) {
            res.clearCookie("viewer", cookieOptions);
            return;
        }
        return viewer;
    }
    const updateRes = await db.users.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.signedCookies.viewer) }, { $set: { token } }, { returnOriginal: false });
    const viewer = updateRes.value;
    console.log(viewer);
    if (!viewer) {
        res.clearCookie("viewer", cookieOptions);
        return;
    }
    return viewer;
};
exports.viewerResolvers = {
    Mutation: {
        logIn: async (_root, { input }, { db, req, res }) => {
            try {
                const userName = input ? input.userName : null;
                const password = input ? input.password : null;
                const token = crypto_1.default.randomBytes(16).toString("hex");
                const viewer = userName && password
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
            }
            catch (error) {
                throw new Error(`Failed to log in: ${error}`);
            }
        },
        logOut: (_root, _args, { res }) => {
            res.clearCookie("viewer", cookieOptions);
            return {
                didRequest: true,
                catelogy: "User",
            };
        },
        createAccount: async (_root, { input }, { db, req, res }) => {
            try {
                const { userName, name, jobStatus, gender, age, marriageStatus, password, education, } = input;
                const user = await db.users.findOne({ userName });
                if (user) {
                    throw new Error("One user with this userName already exists.");
                }
                const token = crypto_1.default.randomBytes(16).toString("hex");
                const userData = {
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
                    doctor: new mongodb_1.ObjectId(req.signedCookies.doctor),
                };
                const necessaryFields = ["userName", "name", "password"];
                for (const [field, value] of Object.entries(userData)) {
                    if (value === "" || value === undefined || value === null) {
                        if (necessaryFields.indexOf(field) !== -1) {
                            throw new Error(`${field} should not be empty!`);
                        }
                        userData[field] = undefined;
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
            }
            catch (error) {
                throw new Error(`Failed to create account: ${error}`);
            }
        },
    },
    Viewer: {
        __resolveType(viewer) {
            if (viewer.catelogy === "User") {
                return "UserViewer";
            }
            else if (viewer.catelogy === "Admin") {
                return "AdminViewer";
            }
            return null;
        },
    },
    UserViewer: {
        id: (viewer) => {
            return viewer._id;
        },
    },
    AdminViewer: {
        id: (viewer) => {
            return viewer._id;
        },
    },
};
