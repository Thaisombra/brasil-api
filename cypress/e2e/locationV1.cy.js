describe('Brazil API Scenarios Search Location V1', () => {

  it('Search Location with valid data', () => {
    const cityName = "Jaguaruana"
    cy.fixture('location').then((fixture) => {
      cy.request({
        method: 'GET',
        url: `https://brasilapi.com.br/api/cptec/v1/cidade/${cityName}`,
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.validateResponseFields(fixture.validLocationResponse, response.body)
      })
    })
  })

  it('Search Location with invalid data', () => {
    const cityNames = ["@$%", "12123", "cd2i"] 

    cy.fixture('location').then((fixture) => {
      cityNames.forEach((cityName) => {
        cy.request({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cptec/v1/cidade/${encodeURIComponent(cityName)}`,
          headers: { 'Content-Type': 'application/json' },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400)
          cy.validateResponseFields(fixture.invalidLocationResponse, response.body)
        })
      })
    })
  })

  it('Search Location with city not found', () => {
    const cityName = "ThaisTeste"
    cy.fixture('location').then((fixture) => {
      cy.request({
        method: 'GET',
        url: `https://brasilapi.com.br/api/cptec/v1/cidade/${cityName}`,
        headers: { 'Content-Type': 'application/json' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404)
        cy.validateResponseFields(fixture.notFoundLocationResponse, response.body)
      })
    })
  })

})
