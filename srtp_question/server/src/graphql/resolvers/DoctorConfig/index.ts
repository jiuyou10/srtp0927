import { Request } from "express";
import { ObjectId } from "mongodb";
import { Database, DoctorConfig } from "../../../lib/type";
import { OperationResult } from "../DoctorList/type";
import {
  AddDoctorConfigInput,
  CheckIfDoctorConfigNameUniqueArgs,
  DeleteConfigInput,
  DoctorConfigList,
  SelectConfigInput,
} from "./type";

export const doctorConfigResolvers = {
  Query: {
    checkIfDoctorConfigNameUnique: async (
      _root: undefined,
      args: CheckIfDoctorConfigNameUniqueArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<OperationResult> => {
      const foundConfig = await db.doctorConfigs.findOne({
        doctorId: new ObjectId(req.signedCookies.doctor),
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
    doctorConfigList: async (
      _root: undefined,
      _args: Record<string, never>, // Means empty object. _args is an empty object.
      { db, req }: { db: Database; req: Request }
    ): Promise<DoctorConfigList> => {
      const doctorId = new ObjectId(req.signedCookies.doctor);
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
    id: (configItem: DoctorConfigList["configs"][number]): string => {
      return configItem._id.toHexString();
    },
  },
  Mutation: {
    addDoctorConfig: async (
      _root: undefined,
      args: AddDoctorConfigInput,
      { db, req }: { db: Database; req: Request }
    ): Promise<OperationResult> => {
      db.doctorConfigs.insertOne({
        doctorId: new ObjectId(req.signedCookies.doctor),
        configName: args.input.configName,
        selected: false,
        formIds: args.input.formIds.map((idString) => new ObjectId(idString)),
        addDate: new Date(),
      });
      return {
        result: true,
      };
    },
    selectConfig: async (
      _root: undefined,
      args: SelectConfigInput,
      { db, req }: { db: Database; req: Request }
    ): Promise<OperationResult> => {
      const doctorId = new ObjectId(req.signedCookies.doctor);
      let selectedConfig: DoctorConfig[];
      do {
        await db.doctorConfigs.findOneAndUpdate(
          { doctorId: doctorId, selected: true },
          { $set: { selected: false } }
        );
        selectedConfig = await db.doctorConfigs
          .find({ doctorId: doctorId, selected: true })
          .toArray();
      } while (selectedConfig.length !== 0);
      if (args.input.configId)
        await db.doctorConfigs.findOneAndUpdate(
          { doctorId: doctorId, _id: new ObjectId(args.input.configId) },
          { $set: { selected: true } }
        );
      return {
        result: true,
      };
    },
    deleteConfig: async (
      _root: undefined,
      args: DeleteConfigInput,
      { db, req }: { db: Database; req: Request }
    ): Promise<OperationResult> => {
      const doctorId = new ObjectId(req.signedCookies.doctor);
      await db.doctorConfigs.findOneAndDelete({
        doctorId: doctorId,
        _id: new ObjectId(args.input.configId),
      });
      return {
        result: true,
      };
    },
  },
};
