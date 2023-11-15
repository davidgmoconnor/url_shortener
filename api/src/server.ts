import { createServer } from "./utils";
import db from "./database";

db.connect().then(() => {
  createServer(true);
});
createServer(true);
