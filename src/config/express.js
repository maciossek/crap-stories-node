import { json, urlencoded } from "body-parser";
import compress from "compression";
import cors from "cors";
import express from "express";
import * as mw from "../middleware";
import routes from "./../index.routes";
import config from "./env";
import consola from "consola";

const isProd = config.env === "production";

const app = express();
const { corsUrls: allowedUrlList } = config;

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedUrlList.includes(origin) || allowedUrlList.includes("*") || !isProd) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(compress());
app.use(mw.logRequests(consola));

app.use("/", routes);

app.use(mw.apiError);

export default app;
