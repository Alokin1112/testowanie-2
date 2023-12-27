describe('editing product item', () => {
  it('should disable editing product when stock quantity provided is negative', () => {
    cy.visit('http://localhost:4200');

    cy.get('#admin-link').click();

    cy.get('.product__admin__item__edit').first().click();
    cy.get('#stockQuantity-input').clear().type('-1');
    cy.get('body').click();

    cy.get('#form-submit-button').should('be.disabled');
    cy.get('#wrong-quantity').should('exist');
  });
});
