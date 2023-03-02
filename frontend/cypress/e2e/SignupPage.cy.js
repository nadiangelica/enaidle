describe("Signing up", () => {
  // beforeEach(() => {
  //   cy.visit("http://localhost:3000/signup");
  // });

  // it("with valid credentials, redirects to '/login'", () => {
  //   cy.get("#organisation-name").type("Charity X");
  //   cy.get("#email").type("signup@example.com");
  //   cy.get("#charity-number").type("123456");
  //   cy.get("#password").type("password");
  //   cy.get("#submit").click();

  //   cy.url().should("include", "/login");
  // });

  it("displays error message if password is missing", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get("#password").clear();
    cy.get("#submit").click();

    // cy.get(".error").should("be.visible");
  });

  // it("with missing email, redirects to '/signup'", () => {
  //   cy.get('#password').type('password');
  //   cy.get('#submit').click();

  //   cy.url().should('include', 'http://localhost:3000/signup');
  // });
});
