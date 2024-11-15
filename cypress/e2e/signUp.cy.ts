describe('Error form handling', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });
  it('Form should have two inputs', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('have.text', 'Se connecter');
    cy.get('p#toggle-form').should(
      'have.text',
      "Tu n'as pas encore de compte ?"
    );
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
});
