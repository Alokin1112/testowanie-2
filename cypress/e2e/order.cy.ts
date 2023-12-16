describe('template spec', () => {
  it('should have links', () => {
    cy.visit('http://localhost:4200')

    // Use the 'get' command to locate the element by its ID
    cy.get('#home-link')
      .should('exist'); // Assert that the element exists

    cy.get('#admin-link')
      .should('exist'); // Assert that the element exists

    cy.get('#orders-link')
      .should('exist'); // Assert that the element exists
  })
})