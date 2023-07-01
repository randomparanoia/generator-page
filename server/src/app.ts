import express from "express";
import { Request } from "express";
import Grid from "./grid";
import cors = require("cors");

const app = express();
app.use(cors<Request>());

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

app.listen(3000);
