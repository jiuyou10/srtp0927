"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorConfigResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.doctorConfigResolvers = {
    Query: {
        checkIfDoctorConfigNameUnique: async (_root, args, { db, req }) => {
            const foundConfig = await db.doctorConfigs.findOne({
                doctorId: new mongodb_1.ObjectId(req.signedCookies.doctor),
                configName: args.doctorConfigName,
            });
            if (foundConfig) {
                return {
                    result: false,
                };
            }
            return {
                result: true,
            };
        },
        doctorConfigList: async (_root, _args, // Means empty object. _args is an empty object.
        { db, req }) => {
            const doctorId = new mongodb_1.ObjectId(req.signedCookies.doctor);
            const configs = await db.doctorConfigs
                .find({
                doctorId,
            })
                .sort({ addDate: -1 })
                .toArray();
            return {
                configs: configs.map((config) => ({
                    ...config,
                    doctorId: config.doctorId.toHexString(),
                    formIds: config.formIds.map((formId) => formId.toHexString()),
                })),
            };
        },
    },
    DoctorConfigItem: {
        id: (configItem) => {
            return configItem._id.toHexString();
        },
    },
    Mutation: {
        addDoctorConfig: async (_root, args, { db, req }) => {
            db.doctorConfigs.insertOne({
                doctorId: new mongodb_1.ObjectId(req.signedCookies.doctor),
                configName: args.input.configName,
                selected: false,
                formIds: args.input.formIds.map((idString) => new mongodb_1.ObjectId(idString)),
                addDate: new Date(),
            });
            return {
                result: true,
            };
        },
        selectConfig: async (_root, args, { db, req }) => {
            const doctorId = new mongodb_1.ObjectId(req.signedCookies.doctor);
            let selectedConfig;
            do {
                await db.doctorConfigs.findOneAndUpdate({ doctorId: doctorId, selected: true }, { $set: { selected: false } });
                selectedConfig = await db.doctorConfigs
                    .find({ doctorId: doctorId, selected: true })
                    .toArray();
            } while (selectedConfig.length !== 0);
            if (args.input.configId)
                await db.doctorConfigs.findOneAndUpdate({ doctorId: doctorId, _id: new mongodb_1.ObjectId(args.input.configId) }, { $set: { selected: true } });
            return {
                result: true,
            };
        },
        deleteConfig: async (_root, args, { db, req }) => {
            const doctorId = new mongodb_1.ObjectId(req.signedCookies.doctor);
            await db.doctorConfigs.findOneAndDelete({
                doctorId: doctorId,
                _id: new mongodb_1.ObjectId(args.input.configId),
            });
            return {
                result: true,
            };
        },
    },
};
