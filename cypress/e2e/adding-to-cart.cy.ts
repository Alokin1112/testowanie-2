describe('add items to cart test', () => {
  it('should add items to cart', () => {
    cy.visit('http://localhost:4200');

    cy.get('.add__button').first().click();

    cy.get('#cart-icon').should('be.visible');

    cy.get('#cart-icon').click();

    cy.get('#cart-product').should('exist');
  });
});
