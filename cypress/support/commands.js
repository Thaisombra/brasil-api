Cypress.Commands.add('validateResponseFields', (modelObj, responseObj) => {

  function validate(model, response) {
    if (Array.isArray(response)) {
      response.forEach(item => validate(model, item))
      return
    }

    for (const key in model) {
      expect(response).to.have.property(key)

      const value = response[key]
      const modelValue = model[key]

      if (typeof modelValue === 'object' && modelValue !== null && !Array.isArray(modelValue)) {
        validate(modelValue, value)
      } else {
        expect(value).to.not.be.null
        expect(value).to.not.equal('')
      }
    }
  }

  validate(modelObj, responseObj)
})
