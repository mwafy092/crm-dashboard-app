describe('Test register', () => {
  it('test new register', () => {
    cy.visit('/');
    cy.wait(500);
    cy.get('[data-cy="registerLink"]').click();
    cy.wait(500);
    cy.get('[data-cy="registerUsername"]').type('mustafa', { delay: 100 });
    cy.get('[data-cy="registerEmail"]').type('mustafa@gmail.com', {
      delay: 100,
    });
    cy.get('[data-cy="registerPassword"]').type('1234', { delay: 100 });
  });
});
