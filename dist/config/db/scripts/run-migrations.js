"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const datasource_1 = require("../datasource");
(async function runMigrations() {
    try {
        /* Implement custom migrations scripts if necessary.
        For example, you can load secrets from AWS Secrets Manager or Vault so migrations can be run in a CI/CD pipeline.
        */
        const dataSource = await datasource_1.AppDataSource;
        await dataSource.initialize();
        console.log("DataSource initialized successfully.");
        await dataSource.runMigrations();
        console.log("Migrations have been run successfully.");
        await dataSource.destroy();
        console.log("DataSource destroyed after migrations.");
    }
    catch (error) {
        console.error("Error running migrations:", error);
        process.exit(1);
    }
})();
//# sourceMappingURL=run-migrations.js.map