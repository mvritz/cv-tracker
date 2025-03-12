import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

require("dotenv").config();

const connectionString = process.env.DB_CONNECTION_STRING as string;

const globalQueryClient = global as unknown as {
  queryClient?: postgres.Sql;
};

const queryClient =
  globalQueryClient.queryClient ?? postgres(connectionString, { max: 12 });

export const db = drizzle(queryClient);
