import { qase } from 'cypress-qase-reporter/mocha';

describe('Brazil API Scenarios Ocean Forecast V1', () => {

  qase(5,
    it('Search Ocean Forecast with valid data', () => {
      const cityCode = 241;
      cy.fixture('address').then((fixture) => {
        cy.request({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cptec/v1/ondas/${cityCode}`,
          headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.validateResponseFields(fixture.oceanForecastValidResponse, response.body);
        });
      });
    })
  );

  qase(6,
    it.only('Search Ocean Forecast with invalid data', () => {
      const cityCode = "abc";
      cy.fixture('address').then((fixture) => {
        cy.request({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cptec/v1/ondas/${cityCode}`,
          headers: { 'Content-Type': 'application/json' },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
          cy.validateResponseFields(fixture.oceanForecastInvalidResponse, response.body);
        });
      });
    })
  );

});
