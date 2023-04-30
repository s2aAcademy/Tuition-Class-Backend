import { NextFunction } from "express";

export const verifyHook = (req, res, next: NextFunction) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  const myToken = "s2aacademy";

  if (mode && token) {
    if (mode === "subscribe" && token === myToken) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403);
    }
  }
};
