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
    const cepRequest = 97050800;
    cy.fixture('address').then((fixture) => {
      cy.request({
        method: 'GET',
        url: "https://brasilapi.com.br/api/cep/v2/${cep}",
        headers: { 'Content-Type': 'application/json' },
        body: { cepRequest },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.errors[0].message).eq(fixture.aboveAndBelow8CharactersResponse.message);
      });
    });
  });

  qase(2,
    it('Should return error when CEP has less than 8 characters', () => {
      const cep = 1234567;
      cy.fixture('address').then((fixture) => {
        cy.request({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
          headers: { 'Content-Type': 'application/json' },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);

          if (Array.isArray(response.body.errors)) {
            expect(response.body.errors).to.include(
              response.body.message,
              'Mensagem e erros estão inconsistentes'
            );
          } else {
            expect(response.body.message).to.eq(
              response.body.errors,
              'Mensagem e erros estão inconsistentes'
            );
          }
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
