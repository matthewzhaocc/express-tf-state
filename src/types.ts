import { Request } from "express";

interface IConfig {
  storageDriver: IStorageDriver;
  lockDriver: ILockDriver;
  credentialsProvider: ICredentialsProvider;
}

interface IStorageDriver {
  get: (req: Request) => any;
  update: (req: Request, obj: any) => any;
  delete: (req: Request) => any;
}

interface ILockDriver {
  lock: (req: Request) => Promise<undefined>;
  unlock: (req: Request) => Promise<undefined>;
  status: (req: Request) => Promise<boolean>;
  setInfo: (req: Request, info: string) => Promise<undefined>;
  getInfo: (req: Request) => Promise<string>;
}

interface ICredentialsProvider {
  verify: (req: Request, user: string, pass: string) => Promise<boolean>;
}

export default IConfig;
