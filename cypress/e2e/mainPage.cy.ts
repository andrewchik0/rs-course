describe('main page', () => {
  it('saves input value', () => {
    cy.visit('/');

    cy.get('.search-input').type('test{enter}');
    cy.get('.lds-roller').should('exist');
    cy.get('.lds-roller', { timeout: 10000 }).should('not.exist');
    cy.get('.content').contains(/paper/);
    cy.get('a[href="/about"]').click();
    cy.get('a[href="/"]').click();
    cy.get('.search-input').should('have.value', 'test');
    cy.get('.content').contains(/paper/);
  });

  it('opens modal window', () => {
    cy.visit('/');

    cy.get('.search-input').type('test{enter}');
    cy.get('.lds-roller').should('exist');
    cy.get('.lds-roller', { timeout: 10000 }).should('not.exist');
    cy.get('.photo-image').first().click();
    cy.get('.lds-roller').should('exist');
    cy.get('.lds-roller', { timeout: 10000 }).should('not.exist');
    cy.get('.modal-image').should('exist');
    cy.get('.modal-window').trigger('keydown', {
      key: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    cy.get('.modal-window').trigger('keydown', {
      key: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    cy.get('.photo-image').first().click();
    cy.get('.modal-window').click();
    cy.get('.modal-layout').click();
  });
});
