describe('Brazil API Scenarios Search Location V1', () => {
  
    it('Search Ocean Forecast with valid data', () => {
    const cityCode = 241
    cy.fixture('address').then((fixture) => {
      cy.request({
        method: 'GET',
        url: `https://brasilapi.com.br/api/cptec/v1/ondas/${cityCode}`,
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.validateResponseFields(fixture.oceanForecastValidResponse, response.body)
      })
    })
    })
})