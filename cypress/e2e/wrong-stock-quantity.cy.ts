describe('add new product with incorrect stock quantity', () => {
  it('should disable adding new product when stock quantity provided is incorrect', () => {
    cy.visit('http://localhost:4200');

    cy.get('#admin-link').click();

    cy.get('.addLink').click();

    cy.get('#name-input').type('new product');

    cy.get('#stockQuantity-input').clear().type('0');

    cy.get('#price-input').type('50.89');

    cy.get('#form-submit-button').should('be.disabled');

    cy.get('#wrong-quantity').should('exist');
  });
});
