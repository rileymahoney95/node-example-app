import "reflect-metadata";
import { AppDataSource } from "../datasource";

(async function runMigrations() {
  try {
    /* Implement custom migrations scripts if necessary.
    For example, you can load secrets from AWS Secrets Manager or Vault so migrations can be run in a CI/CD pipeline.
    */
    const dataSource = await AppDataSource;
    await dataSource.initialize();
    console.log("DataSource initialized successfully.");

    await dataSource.runMigrations();
    console.log("Migrations have been run successfully.");

    await dataSource.destroy();
    console.log("DataSource destroyed after migrations.");
  } catch (error) {
    console.error("Error running migrations:", error);
    process.exit(1);
  }
})();
