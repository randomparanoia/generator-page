import express from "express";
import { Request } from "express";
import Grid from "./grid";
import File from "./file";
import cors = require("cors");

const file: any = new File();
let db: any = JSON.parse(file.read());

const app = express();
app.use(cors<Request>());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Route - Generate Grid Code
app.get("/code", (req: any, res: any, next: any) => {
  const char = req.query.character !== undefined ? req.query.character : "";
  const grid = new Grid(char);
  const gridData = grid.generate();
  const code = grid.calculateCode(gridData);

  let data = {
    grid: gridData,
    code,
  };

  res.json(data);
});

// Persist payment to db.json
app.post("/payment", (req: any, res: any, next: any) => {
  const data = req.body;
  let jsonData = {};
  jsonData[data.name] = {
    code: data.code,
    amount: data.amount,
    grid: data.grid,
  };

  db.push(jsonData);
  file.update(db);

  res.json({ msg: "created" });
});

// GET all db.json codes
app.get("/codes", (req: any, res: any, next: any) => {
  res.json(db);
});

app.listen(3000);
