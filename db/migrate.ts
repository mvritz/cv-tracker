import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(
  process.env.DB_MIGRATION_CONNECTION_STRING as string,
  { max: 1 }
);

const migrationDb = drizzle(migrationClient);

async function main() {
  try {
    console.info("--------------------------------");
    console.info("Starting migration");
    console.info("--------------------------------");

    await migrate(migrationDb, {
      migrationsFolder: "./drizzle",
    });

    console.info("--------------------------------");
    console.info("Migration complete");
    console.info("--------------------------------");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  await migrationClient.end();
  process.exit(0);
}

void main();
