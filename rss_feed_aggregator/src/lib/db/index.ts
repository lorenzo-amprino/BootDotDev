import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { readConfig } from "../../config";

const config = readConfig();
const conn = postgres(config.dbUrl, { ssl: false });

(async () => {
  try {
    await conn`select 1`;
    console.log("raw conn ok");
  } catch (e) {
    console.error("raw conn failed", e);
  }
})();

export const db = drizzle(conn, { schema });