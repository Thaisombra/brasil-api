const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const qase = require('@qase/cypress');
      qase(on, config, {
        apiToken: process.env.QASE_API_TOKEN, 
        projectCode: 'TPSOPA',              
        runTitle: 'Execução automatizada Jenkins - Brasil API',
      });

      return config;
    },
  },
});
