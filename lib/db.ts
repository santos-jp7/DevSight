import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../drizzle/schema";
import * as relations from "../drizzle/relations";

const fullSchema = { ...schema, ...relations };

const poolConnection = mysql.createPool(process.env.DATABASE_URL!);
export const db = drizzle(poolConnection, {
  schema: fullSchema,
  mode: "default",
});
