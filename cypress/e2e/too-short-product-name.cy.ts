describe('add new product with too short name test', () => {
  it('should disable adding new product when name provided is too short', () => {
    cy.visit('http://localhost:4200');

    cy.get('#admin-link').click();

    cy.get('.addLink').click();

    cy.get('#name-input').type('new');

    cy.get('#stockQuantity-input').type('20');

    cy.get('#price-input').type('50.89');

    cy.get('#form-submit-button').should('be.disabled');

    cy.get('#wrong-name').should('exist');
  });
});
