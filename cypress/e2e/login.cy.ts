describe('check login page', () => {
  it('Login with correct data', () => {
    cy.visit('/');
    cy.get('[data-cy=emai]').type('mwafy@gmail.com', { delay: 50 });
    cy.get('[data-cy=password]').type('123', { delay: 50 });
    cy.wait(500);
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);
    cy.wait(2000);
    // cy.get('[data-cy=messageClose]').click();
  });
  it('Login with incorrect data', () => {
    cy.get('[data-cy=logout]').click();
    cy.get('[data-cy=email]').type('mwafy2@gmail.com', { delay: 50 });
    cy.get('[data-cy=password]').type('123', { delay: 50 });
    cy.wait(500);
    cy.get('[data-cy=submit]').click();
  });
  it('Login with correct data', () => {
    cy.visit('/');
    cy.get('[data-cy=email]').clear().type('mwafy@gmail.com', { delay: 50 });
    cy.get('[data-cy=password]').type('123', { delay: 50 });
    cy.wait(500);
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);
    cy.wait(2000);
  });
});
