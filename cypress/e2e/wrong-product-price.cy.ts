describe('add new product with incorrect price', () => {
  it('should disable adding new product when price provided is incorrect', () => {
    cy.visit('http://localhost:4200');

    cy.get('#admin-link').click();

    cy.get('.addLink').click();

    cy.get('#name-input').type('new product');

    cy.get('#stockQuantity-input').clear().type('420');

    cy.get('#price-input').clear();

    cy.get('body').click();

    cy.get('#form-submit-button').should('be.disabled');

    cy.get('#wrong-price').should('exist');
  });
});
