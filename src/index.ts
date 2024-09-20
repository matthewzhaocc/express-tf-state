import express from "express";

import IConfig from "./types";

const tfStateRouterBuilder = (config: IConfig) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    let state = await config.storageDriver.get(req);
    if (!("version" in state)) {
      state = await config.storageDriver.update(req, { version: 1 });
    }
    return res.json(state);
  });

  router.post("/", async (req, res) => {
    await config.storageDriver.update(req, req.body);
    res.status(200).send();
  });

  router.lock("/lock", async (req, res) => {
    const status = await config.lockDriver.status(req);
    if (status) {
      const lockInfo = await config.lockDriver.getInfo(req);
      return res.status(423).json({ Info: lockInfo });
    } else {
      await config.lockDriver.setInfo(req, req.body.Info);
      res.status(200).send();
    }
  });

  router.unlock("/unlock", async (req, res) => {
    await config.lockDriver.unlock(req);
    return res.status(200).send();
  });

  return router;
};

export default tfStateRouterBuilder;
