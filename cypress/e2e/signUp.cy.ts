describe('Error form handling', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });
  it('Form should be log-in form by default', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.log('Two inputs finds as expected');

    cy.get('button[type="submit"]').should('have.text', 'Se connecter');
    cy.get('p#toggle-form').should(
      'have.text',
      "Tu n'as pas encore de compte ?"
    );
    cy.log('Button and text values are as expected');
  });
  it('Form should toggle between sign in and sign up', () => {
    cy.get('p#toggle-form').click();
    cy.get('p#toggle-form').should('have.text', 'Tu as déjà un compte ?');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('not.exist');
    cy.get('button[type="submit"]').should('have.text', "S'inscrire");
  });
  it('Form should show conditions error', () => {
    cy.get('p#toggle-form').click();
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('form').submit();
    cy.contains("Veuillez accepter les conditions d'utilisation").should(
      'exist'
    );
  });
  it('Form should show email domain error', () => {
    cy.get('p#toggle-form').click();
    cy.get('input[name="email"]').type('test@test');
    cy.get('input[name="terms"]').click();
    cy.get('form').submit();
    cy.contains(
      "Veuillez utiliser une adresse e-mail d'un fournisseur connu (Gmail, Yahoo, etc.)"
    ).should('exist');
  });
  it('Form should show email exist error', () => {
    cy.get('p#toggle-form').click();
    cy.get('input[name="email"]').type('nutuestampados@gmail.com');
    cy.get('input[name="terms"]').click();
    cy.get('form').submit();
    cy.contains('Cet email est déjà associé à un compte').should('exist');
  });
  it('Log in with valid credentials shows success modal', () => {
    cy.get('p#toggle-form').click();
    cy.get('input[name="email"]').type('pepito-mail@gmail.com');
    cy.get('input[name="terms"]').click();
    cy.get('form').submit();
    cy.get('#success-modal').should('exist');
    cy.get('#success-modal').should('contain', 'Mail envoyé !');
    cy.get('#success-modal').should(
      'contain',
      'Vérifie ton e-mail pour activer ton compte.'
    );
    cy.get('#success-modal').should('contain', 'Tu peux fermer cette page.');
  });
});
