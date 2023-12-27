describe('add items to cart and check total price test', () => {
  it('should display total price of items added to cart', () => {
    cy.visit('http://localhost:4200');

    cy.get('#admin-link').click();
    cy.get('.addLink').click();
    cy.get('#name-input').type('Aaaaaa');
    cy.get('#stockQuantity-input').clear().type('420');
    cy.get('#price-input').clear().type('120');
    cy.get('#form-submit-button').click();

    cy.get('#home-link').click();

    cy.get('.add__button').first().click();
    cy.get('.add__button').first().click();
    cy.get('.add__button').first().click();

    cy.get('#cart-icon').click();

    cy.get('#total-price').should('exist');
    cy.get('#total-price').should('have.text', ' = 360,00 zł ');

    //czyszczenie zmian
    cy.get('#admin-link').click();
    cy.get('.delete-admin-item-button').first().click();
  });
});
