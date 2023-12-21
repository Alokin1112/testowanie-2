describe('delete items from cart test', () => {
  it('should delete item from cart', () => {
    cy.visit('http://localhost:4200');

    cy.get('.add__button').first().click();

    cy.get('#cart-icon').should('be.visible');

    cy.get('#cart-icon').click();

    cy.get('#cart-product').should('be.visible');

    cy.get("#delete-from-cart").click();

    cy.get("#no-products-in-cart").should("exist");
  });
});
