import events from "events";
import express from "express";
import cors from "cors";
import * as R from "ramda";
const emitter = new events.EventEmitter();

let modelRoute = [];

export default (app) => {
  app.use(cors());
  app.use(express.json());

  R.map((route) => {
    app.get(`/get_${route}`, (req, res) => {
      console.log(req)
      // emitter.once(route, (message) => {
      //   res.json(message);
      // });
    });

    app.post(`/set_${route}`, (req, res) => {
      const message = req.body;
      emitter.emit(route, message);
      res.status(200);
    });

  })(modelRoute);
};
