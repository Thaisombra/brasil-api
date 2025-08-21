describe('Brazil API V2 Scenarios Search Location', () => {
  
  it('Search CEP with valid data',{tags: ['QASE-1'] }, () => {
    const cep = 97050800
    cy.fixture('address').then((fixture) => {
      cy.request({
        method: 'GET',
        url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.validateResponseFields(fixture.validAddressResponse, response.body)
      })
    })
  })

  // Needs to fail because sending CEP in body is not allowed
  it('Search CEP by sending CEP in request body',{tags: ['QASE-2'] }, () => {
    cy.fixture('address').then((fixture) => {
      cy.request({
        method: 'GET',
        url: "https://brasilapi.com.br/api/cep/v2/${cep}",
        headers: { 'Content-Type': 'application/json' },
        body: { cep: 97050800 },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        cy.validateResponseFields(fixture.passingCepInBodyResponse, response.body)
      })
    })
  })

  // Partially correct: CEP less than 8 digits not properly indicated
  it('Should return error when CEP has less or more than 8 characters', () => {
    const boundaryCeps = [1234567, 888888888] 
    cy.fixture('address').then((fixture) => {
      boundaryCeps.forEach((cep) => {
        cy.request({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
          headers: { 'Content-Type': 'application/json' },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400)
          cy.validateResponseFields(fixture.above8CharactersResponse, response.body)
        })
      })
    })
  })
})
