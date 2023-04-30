import express, { Application } from "express";
import path from "path";
const cors = require("cors");

import { UserRoute, AdminRoute } from "../routes";
import { WebHookRoute } from "../routes/WebHookRoute";

async function App(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  app.use(cors());

  const imagePath = path.join(__dirname, "../images");

  app.use("/images", express.static(imagePath));

  app.use("/admin", AdminRoute);
  app.use("/user", UserRoute);
  app.use("/webhooks", WebHookRoute);

  return app;
}

module.exports = {
  App,
};
