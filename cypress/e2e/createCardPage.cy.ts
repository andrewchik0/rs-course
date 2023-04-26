describe('create card page', () => {
  function dateTostring(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
      .toISOString()
      .substring(0, 10);
  }

  it('opens create page', () => {
    cy.visit('/create-card');

    cy.get('.submit-button').click();

    const validations = ['name', 'birthday', 'breed', 'gender', 'Image'];
    cy.get('.error-validation').each((item, index) => cy.wrap(item).contains(validations[index]));

    cy.get('#name-input').type('Kitty');
    cy.get('#date-input').type('2022-02-20');
    cy.get('#breed').select('British Shorthair');
    cy.get('#male').check();
    cy.get('#microchipped-checkbox').check();
    cy.get('#image').selectFile(
      {
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'file.png',
        type: 'image/png',
      },
      { force: true }
    );
    cy.get('.submit-button').click();

    cy.get('.success-message').should('be.visible');

    cy.get('.card').contains('Kitty');
    cy.get('.card').contains('20.02.2022 (1 Year)');
    cy.get('.card').contains('British Shorthair');
    cy.get('.card').contains('Male');
    cy.get('.card').contains('Microchipped');

    cy.get('a[href="/about"]').click();
    cy.get('a[href="/create-card"]').click();

    cy.get('.card').contains('Kitty');
    cy.get('.card').contains('20.02.2022 (1 Year)');
    cy.get('.card').contains('British Shorthair');
    cy.get('.card').contains('Male');
    cy.get('.card').contains('Microchipped');
  });

  it('renders cards with Days word', () => {
    cy.visit('/create-card');

    cy.get('#name-input').type('Kitty');
    cy.get('#date-input').type(dateTostring(new Date()));
    cy.get('#breed').select('British Shorthair');
    cy.get('#male').check();
    cy.get('#microchipped-checkbox').check();
    cy.get('#image').selectFile(
      {
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'file.png',
        type: 'image/png',
      },
      { force: true }
    );
    cy.get('.submit-button').click();

    cy.get('.card').contains('Day');
  });

  it('renders cards with Month word', () => {
    cy.visit('/create-card');

    const now = new Date();
    const birthday = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate() - 4);
    cy.get('#name-input').type('Kitty');
    cy.get('#date-input').type(dateTostring(birthday));
    cy.get('#breed').select('British Shorthair');
    cy.get('#male').check();
    cy.get('#microchipped-checkbox').check();
    cy.get('#image').selectFile(
      {
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'file.png',
        type: 'image/png',
      },
      { force: true }
    );
    cy.get('.submit-button').click();

    cy.get('.card').contains('Month');
  });
  it('renders cards with Year word', () => {
    cy.visit('/create-card');

    const now = new Date();
    const birthday = new Date(now.getFullYear() - 1, now.getMonth() - 1, now.getDate() - 4);
    cy.get('#name-input').type('Kitty');
    cy.get('#date-input').type(dateTostring(birthday));
    cy.get('#breed').select('British Shorthair');
    cy.get('#male').check();
    cy.get('#microchipped-checkbox').check();
    cy.get('#image').selectFile(
      {
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'file.png',
        type: 'image/png',
      },
      { force: true }
    );
    cy.get('.submit-button').click();

    cy.get('.card').contains('Year');
  });
});
