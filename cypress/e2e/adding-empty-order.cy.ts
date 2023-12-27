describe('add new empty order', () => {
  it('create order button should be disabled when order is empty', () => {
    cy.visit('http://localhost:4200');

    cy.get('#cart-icon').click();

    cy.get('#create-order').should('exist');

    cy.get('#create-order').should('be.disabled');
  });
});
