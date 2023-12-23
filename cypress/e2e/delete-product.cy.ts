describe('delete product test', () => {
  it('should delete product', () => {
    cy.visit('http://localhost:4200');

    cy.get('#admin-link').click();

    cy.get('.addLink').click();

    cy.get('#name-input').type('testproduct');

    cy.get('#stockQuantity-input').type('20');

    cy.get('#price-input').type('50.89');

    cy.get('#form-submit-button').click();

    cy.get('#admin-link').click();

    cy.get('.product__pagination')
      .invoke('attr', 'id')
      .then((initialPaginationId) => {
        const initialPaginationIdAsInt = parseInt(initialPaginationId, 10);

        cy.get(".delete-admin-item-button").first().click();
        cy.get('.product__pagination').should('be.visible');
        cy.wait(2000);

        cy.get('.product__pagination')
          .invoke('attr', 'id')
          .then((updatedPaginationId) => {
            const updatedPaginationIdAsInt = parseInt(updatedPaginationId, 10);

            expect(updatedPaginationIdAsInt).to.eq(initialPaginationIdAsInt - 1);
          });
      });
  });
});
