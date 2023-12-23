describe('add items to cart and check items count test', () => {
  it('should display number of items added to cart', () => {
    cy.visit('http://localhost:4200');

    cy.get('.add__button').first().click();
    cy.get('.add__button').first().click();
    cy.get('.add__button').first().click();

    cy.get('.cart__items__count').should('have.text', ' 3 ');
  });
});
