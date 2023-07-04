import fs = require("fs");

export default class File {
  // read db.json file
  read() {
    return fs.readFileSync("db.json");
  }

  // update db.json file
  update(jsonData: any) {
    fs.writeFileSync("db.json", JSON.stringify(jsonData));
  }
}
