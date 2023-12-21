describe('check if previous page button is disabled', () => {
  it('previous page button should be disabled', () => {
    cy.visit('http://localhost:4200');

    cy.get('#pagination-page').then(($paginationPage) => {
      const paginationPageValue = parseInt($paginationPage.text(), 10);

      expect(paginationPageValue).to.equal(1);

      cy.get('#previous-page-button').should('exist');

      cy.get('#previous-page-button').should('be.disabled');
    });
  });
});
