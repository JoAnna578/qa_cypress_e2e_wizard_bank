/// <reference types='cypress' />

describe('Bank app', () => {
  before(() => {
    cy.visit('/');
  });

  it("should provide the ability to work with Hermione's bank account", () => {
    // Kliknij Customer Login
    cy.contains('Customer Login').click();

    // Wybierz Hermione Granger i zaloguj się
    cy.get('select').select('Hermione Granger');
    cy.contains('Login').click();

    // Sprawdź numer konta, saldo i walutę
    cy.get('.ng-binding').contains('1001').should('be.visible');
    cy.get('.ng-binding').eq(1).should('contain', '0'); // precyzyjnie wybiera saldo
    cy.get('.ng-binding').contains('Dollar').should('be.visible');

    // Wpłata 100
    cy.contains('Deposit').click();
    cy.get('input[placeholder="amount"]').type('100');
    cy.contains('Deposit').click();
    cy.contains('Deposit Successful').should('be.visible');
    cy.get('.ng-binding').eq(1).should('contain', '100');

    // Wypłata 50
    cy.contains('Withdrawl').click();
    cy.get('input[placeholder="amount"]').type('50');
    cy.contains('Withdraw').click();
    cy.contains('Transaction successful').should('be.visible');
    cy.get('.ng-binding').eq(1).should('contain', '50');

    // Sprawdź transakcje
    cy.contains('Transactions').click();
    cy.get('table tbody tr').first().should('contain', 'Deposit').and('contain', '100');
    cy.get('table tbody tr').last().should('contain', 'Withdrawal').and('contain', '50');

    // Cofnij
    cy.contains('Back').click();

    // Zmień konto
    cy.get('#accountSelect').select('1002');
    cy.contains('Transactions').click();
    cy.get('table tbody tr').should('not.exist');

    // Wyloguj
    cy.contains('Logout').click();
    cy.contains('Your Name :').should('be.visible');
  });
});
