describe("Signing up", () => {
  // beforeEach(() => {
  //   cy.visit("http://localhost:3000/signup");
  // });

  it("displays error message if password is missing", () => {
    cy.visit("http://localhost:3000/login");
    // cy.get("#password").clear();
    cy.get('input[type="password"]').clear("");

    cy.get("#submit").click();

    cy.get(".error").should("be.visible");
  });

  // it("with missing email, redirects to '/signup'", () => {
  //   cy.get('#password').type('password');
  //   cy.get('#submit').click();

  //   cy.url().should('include', 'http://localhost:3000/signup');
  // });
});
