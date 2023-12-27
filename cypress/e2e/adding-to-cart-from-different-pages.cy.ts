describe('add to cart products from different pages', () => {
  it('should correctly add to cart products from different pages', () => {
    cy.visit('http://localhost:4200');
    cy.get('#home-link').click();

    cy.get('.product__title').first().invoke('text').as('firstProductName');
    cy.get('.amount__input').first().clear().type('2');
    cy.get('.add__button').first().click();

    cy.get('#next-page-button').click();

    cy.get('.product__title').eq(1).invoke('text').as('secondProductName');
    cy.get('.amount__input').eq(1).clear().type('3');
    cy.get('.add__button').eq(1).click();

    cy.get('.cart__items__count').should('have.text', ' 5 ');
    cy.get('#home-link').click();

    cy.get('#previous-page-button').click();
    cy.get('@firstProductName').then((text) => {
      cy.get('.cart__button').first().click();

      cy.get('.cart__item__header').first().should('have.text', text);
      cy.get('.quantity').first().should('have.text', ' 2 ');
      cy.get('#home-link').click();
    });

    cy.get('#next-page-button').click();
    cy.get('@secondProductName').then((text) => {
      cy.get('.cart__button').first().click();

      cy.get('.cart__item__header').eq(1).should('have.text', text);
      cy.get('.quantity').eq(1).should('have.text', ' 3 ');
    });

    //czyszczenie
    cy.get('#cart-icon').click();
    cy.get('#delete-from-cart').click();
    cy.get('#delete-from-cart').click();
  });
});
