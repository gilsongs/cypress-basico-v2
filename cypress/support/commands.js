Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Gilson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('gilsongs.1979@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()    
})
