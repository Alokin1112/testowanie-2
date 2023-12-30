import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/reports/mochawesome",
    "overwrite": false,
    "html": false,
    "json": true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
