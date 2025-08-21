import { defineConfig } from 'cypress';
import { afterSpecHook } from 'cypress-qase-reporter/hooks';

export default defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-qase-reporter, mocha-allure-reporter',
    
    cypressQaseReporterReporterOptions: {
      mode: "testops",
      debug: true,
      testops: {
        api: {
          token: process.env.QASE_API_TOKEN, // Use Jenkins credentials
        },
        project: "TPSOPA",
        uploadAttachments: true,
        run: {
          complete: true,
        },
      },
      framework: {
        cypress: {
          screenshotsFolder: 'cypress/screenshots',
          videosFolder: 'cypress/videos',
          uploadDelay: 10,
        },
      },
    },

    mochaAllureReporterReporterOptions: {
      targetDir: 'allure-results',
    },
  },

  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      // Qase
      require('cypress-qase-reporter/plugin')(on, config);
      require('cypress-qase-reporter/metadata')(on);

      on('after:spec', async (spec, results) => {
        await afterSpecHook(spec, config);
      });

      // Allure
      require('@shelex/cypress-allure-plugin/writer')(on, config);

      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}', // Ajuste para seus testes
  },
});
