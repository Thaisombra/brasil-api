import { qase } from 'cypress-qase-reporter/mocha';

describe('Brazil API V2 Scenarios Search Location', () => {

  qase(1,
    it('Search CEP with valid data', () => {
      const cep = 97050800;
      cy.fixture('address').then((fixture) => {
        cy.request({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
          headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.validateResponseFields(fixture.validAddressResponse, response.body);
        });
      });
    })
  );

  it('Search CEP by sending CEP in request body', () => {
    const cep = 97050800;
    cy.fixture('address').then((fixture) => {
      cy.request({
        method: 'GET',
        url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
        headers: { 'Content-Type': 'application/json' },
        body: { cep },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        cy.validateResponseFields(fixture.passingCepInBodyResponse, response.body);
      });
    });
  });

  qase(2,
    it('Should return error when CEP has less 8 characters', () => {
      const cep = 1234567;
      cy.fixture('address').then((fixture) => {
        cy.request({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
          headers: { 'Content-Type': 'application/json' },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
          cy.validateResponseFields(fixture.aboveAndBelow8CharactersResponse, response.body.errors.message);
        });
      });
    })
  );

  qase(3,
    it('Should return error when CEP has more than 8 characters', () => {
      const cep = 888888888;
      cy.fixture('address').then((fixture) => {
        cy.request({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
          headers: { 'Content-Type': 'application/json' },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
          cy.validateResponseFields(fixture.aboveAndBelow8CharactersResponse, response.body);
        });
      });
    })
  );

});
