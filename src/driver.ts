import express from "express";
import tfStateRouterBuilder from ".";
import morgan from "morgan";

const app = express();

let state = {};
let locked = false;
let lockInfo = "";

app.use(express.json());
app.use(morgan("dev"));

app.use(
  "/",
  tfStateRouterBuilder({
    storageDriver: {
      get: async (req) => {
        return state;
      },
      update: async (req, state_) => {
        state = state_;
        return state;
      },
      delete: async (req) => {
        state = {};
        return {};
      },
    },
    lockDriver: {
      lock: async (req) => {
        locked = true;
      },
      unlock: async (req) => {
        locked = false;
      },
      status: async (req) => {
        return locked;
      },
      setInfo: async (req, info) => {
        lockInfo = info;
      },
      getInfo: async (req) => {
        return lockInfo;
      },
    },
    credentialsProvider: {
      verify: async (req, user, pass) => {
        return true;
      },
    },
  })
);

app.listen(process.env.PORT || 8000);
