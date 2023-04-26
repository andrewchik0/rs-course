describe('about page', () => {
  it('opens about page', () => {
    cy.visit('/about');

    cy.get('.about').contains('About');
  });
});
