/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        
        cy.get('#firstName').type('Gilson')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('gilsongs.1979@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Gilson')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('gilsongs.1979@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Gilson')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('gilsongs.1979@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()        
        
        cy.get('.error').should('be.visible')    
    })   
    
    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Gilson')
            .should('have.value', 'Gilson')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')       
        cy.get('#email')
            .type('gilsongs.1979@gmail.com')
            .should('have.value', 'gilsongs.1979@gmail.com')
            .clear()
            .should('have.value', '')         
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })       
  })
  