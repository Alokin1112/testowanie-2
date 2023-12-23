describe('add new product test', () => {
  it('should add new product', () => {
    cy.visit('http://localhost:4200');

    cy.get('.product__pagination')
      .invoke('attr', 'id')
      .then((initialPaginationId) => {
        const initialPaginationIdAsInt = parseInt(initialPaginationId, 10);

        cy.get('#admin-link').click();

        cy.get('.addLink').click();

        cy.get('#name-input').type('newproduct');

        cy.get('#stockQuantity-input').type('20');

        cy.get('#price-input').type('50.89');

        cy.get('#form-submit-button').click();

        cy.get('#home-link').should('be.visible');

        cy.get('#home-link').click();

        cy.get('.product__pagination').should('be.visible');

        cy.get('.product__pagination')
          .invoke('attr', 'id')
          .then((updatedPaginationId) => {
            const updatedPaginationIdAsInt = parseInt(updatedPaginationId, 10);

            expect(updatedPaginationIdAsInt).to.eq(initialPaginationIdAsInt + 1);
          });
        cy.get('#admin-link').click();
        cy.get('.delete-admin-item-button').first().click();
      });
  });
});
