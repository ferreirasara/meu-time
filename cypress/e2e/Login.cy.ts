describe('Login spec', () => {
  it('login fails with wrong api key', () => {
    cy.visit('/');

    cy.get('input[type=password]')
      .should('be.visible')
      .type('wrong-api-key');

    cy.get('button')
      .should('be.visible')
      .click();

    cy.get('div.ant-form-item-explain-error')
      .should('be.visible');
  });

  it('login succesfully', () => {
    cy.visit('/');

    cy.get('input[type=password]')
      .should('be.visible')
      .type('4e2c51abb2f253f0cd1b35405af52f4e');

    cy.get('button')
      .should('be.visible')
      .click();

    cy.get('div.ant-empty-description')
      .should('be.visible');
  })
})