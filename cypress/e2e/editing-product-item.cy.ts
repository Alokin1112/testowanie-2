describe('editing product item', () => {
  it('should properly edit product name', () => {
    cy.visit('http://localhost:4200');
    cy.get('#home-link').click();

    cy.get('.product__title').first().invoke('text').as('firstProductName');

    cy.get('@firstProductName').then((text) => {
      cy.get('#admin-link').click();

      cy.get('.header__product__admin__item').first().should('have.text', text);
      cy.get('.product__admin__item__edit').first().click();
      cy.get('#name-input').type(' XXX');
      cy.get('#form-submit-button').click();
      cy.get('#home-link').click();

      cy.get('.product__title')
        .first()
        .should('have.text', text + ' XXX');
      //czyszczenie zmian
      cy.get('#admin-link').click();
      cy.get('.product__admin__item__edit').first().click();
      cy.get('#name-input').clear().type(text);
      cy.get('#form-submit-button').click();
      cy.get('#home-link').click();
    });
  });

  it('should properly edit product quantity', () => {
    cy.visit('http://localhost:4200');
    cy.get('#admin-link').click();

    cy.get('.product__admin__amount').first().invoke('text').as('firstProductQuantity');

    cy.get('@firstProductQuantity').then((text) => {
      cy.get('.product__admin__amount').first().should('have.text', text);
      cy.get('.product__admin__item__edit').first().click();
      cy.get('#stockQuantity-input').clear().type('420');
      cy.get('#form-submit-button').click();
      cy.get('#home-link').click();

      cy.get('#admin-link').click();
      cy.get('.product__admin__amount').first().should('have.text', ' Ilość: 420 ');
      
      //czyszczenie zmian
      cy.get('#admin-link').click();
      cy.get('.product__admin__item__edit').first().click();
      cy.get('#stockQuantity-input').clear().type(text);
      cy.get('#form-submit-button').click();
      cy.get('#home-link').click();
    });
  });

  it('should properly edit product price', () => {
    cy.visit('http://localhost:4200');
    cy.get('#home-link').click();

    cy.get('.product__price').first().invoke('text').as('firstProductPrice');

    cy.get('@firstProductPrice').then((text) => {
      cy.get('#admin-link').click();

      cy.get('.product__admin__price').first().should('have.text', text);
      cy.get('.product__admin__item__edit').first().click();
      cy.get('#price-input').clear().type('100');
      cy.get('#form-submit-button').click();
      cy.get('#home-link').click();

      cy.get('.product__price').first().should('have.text', ' 100,00 zł ');

      //czyszczenie zmian
      const match = text.match(/(\d+),\d+ zł/);
      const priceValue = match ? match[1] : '';

      cy.get('#admin-link').click();
      cy.get('.product__admin__item__edit').first().click();
      cy.get('#price-input').clear().type(priceValue);
      cy.get('#form-submit-button').click();
      cy.get('#home-link').click();
    });
  });

  it('should editing price value not impact on orders', () => {
    cy.visit('http://localhost:4200');
    cy.get('#home-link').click();
    cy.get('.product__title').first().invoke('text').as('firstProductName');
    cy.get('.product__price').first().invoke('text').as('firstProductPrice');

    cy.get('.add__button').first().click();

    cy.get('@firstProductName').then((productName) => {
      cy.get('@firstProductPrice').then((producPrice) => {
        cy.get('.cart__button').first().click();

        cy.get('.cart__item__header').first().should('have.text', productName);
        cy.get('.cart__item__price').first().should('have.text', producPrice);
        cy.get('#create-order').click();

        cy.get('#orders-link').click();
        cy.get('.order__item__name')
          .first()
          .should('have.text', ' ' + productName + ' ');
        cy.get('.order__item__price')
          .first()
          .should('have.text', producPrice.trim());
        cy.get('#admin-link').click();
        cy.get('.header__product__admin__item')
          .first()
          .should('have.text', productName);
        cy.get('.product__admin__item__edit').first().click();
        cy.get('#price-input').clear().type('20');
        cy.get('#form-submit-button').click();
        cy.get('.header__product__admin__item')
          .first()
          .should('have.text', productName);
        cy.get('.product__admin__price')
          .first()
          .should('have.text', ' 20,00 zł ');
        cy.get('#orders-link').click();

        cy.get('.order__item__name')
          .first()
          .should('have.text', ' ' + productName + ' ');
        cy.get('.order__item__price')
          .first()
          .should('have.text', producPrice.trim());

        cy.get('#admin-link').click();
        cy.get('.header__product__admin__item')
          .first()
          .should('have.text', productName);
        cy.get('.product__admin__item__edit').first().click();
        cy.get('#price-input').clear().type('39');
        cy.get('#form-submit-button').click();
      });
    });
  });
});
