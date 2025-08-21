import { qase } from 'cypress-qase-reporter/mocha';

describe('Brazil API V2 Scenarios Search Location', () => {

  // Teste vinculado ao Test Case 1 no Qase
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

  // Teste genérico, sem vinculação Qase
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

  // Teste vinculado ao Test Case 2 no Qase
  qase(2,
    it('Should return error when CEP has less or more than 8 characters', () => {
      const boundaryCeps = [1234567, 888888888];
      cy.fixture('address').then((fixture) => {
        boundaryCeps.forEach((cep) => {
          cy.request({
            method: 'GET',
            url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
            headers: { 'Content-Type': 'application/json' },
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(400);
            cy.validateResponseFields(fixture.above8CharactersResponse, response.body);
          });
        });
      });
    })
  );

});
