describe('adding more items than quantity', () => {
  it('should not be able to add more items than quantity', () => {
    cy.visit('http://localhost:4200');

    cy.get('#admin-link').click();

    cy.get('.addLink').click();

    cy.get('#name-input').clear().type('newItemForTestingPurposes');

    cy.get('#stockQuantity-input').clear().type('20');

    cy.get('#price-input').clear().type('50.89');

    cy.get('#form-submit-button').should('be.enabled');
    cy.get('#form-submit-button').click();

    cy.get('#home-link').click();

    cy.get('.product__title').first().should('have.text', 'newItemForTestingPurposes');

    cy.get('.amount__input')
      .first()
      .clear()
      .type('20');

    cy.get('.add__button').first().click();

    cy.get('.amount__input')
      .first()
      .clear()
      .type('1');
    cy.get('.add__button').first().should('be.disabled');

    cy.get('#admin-link').click();
    cy.get('.delete-admin-item-button').first().click();

  });
});
