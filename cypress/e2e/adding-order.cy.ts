describe('add new order test', () => {
  it('should add new order', () => {
    cy.visit('http://localhost:4200');

    cy.get('#orders-link').click();

    cy.get('.order__pagination')
      .invoke('attr', 'id')
      .then((initialPaginationId) => {
        const initialPaginationIdAsInt = parseInt(initialPaginationId, 10);

        cy.get('#home-link').click();

        cy.get('.add__button').first().click();

        cy.get('#cart-icon').click();

        cy.get('#create-order').click();

        cy.get('#orders-link').should('be.visible');

        cy.get('#orders-link').click();
        cy.get('#orders-link').click();

        cy.get('.order__pagination').should('be.visible');

        cy.get('.order__pagination')
          .invoke('attr', 'id')
          .then((updatedPaginationId) => {
            const updatedPaginationIdAsInt = parseInt(updatedPaginationId, 10);

            expect(updatedPaginationIdAsInt).to.eq(initialPaginationIdAsInt + 1);
          });
      });
  });
});
