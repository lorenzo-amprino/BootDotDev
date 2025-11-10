// typescript
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { readConfig } from "../../config";

const config = readConfig();

export const conn = postgres(config.dbUrl, {
  ssl: false,
  max: 1,
  idle_timeout: 5,
  connect_timeout: 5000,
  prepare: false,
  hostname: "127.0.0.1",
});
export const db = drizzle(conn, { schema });
