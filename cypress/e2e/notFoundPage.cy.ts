describe('not found page', () => {
  it('opens not found page', () => {
    cy.visit('/42');

    cy.get('.not-found').contains('Not found');
  });
});
