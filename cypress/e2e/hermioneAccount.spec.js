/// <reference types="cypress" />

describe('Bank app', () => {
  before(() => {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  });

  it('should provide the ability to work with Hermione\'s bank account', () => {
    // Kliknij Customer Login
    cy.contains('Customer Login').click();

    // Wybierz Hermione Granger i zaloguj się
    cy.get('#userSelect').select('Hermione Granger');
    cy.get('button[type="submit"]').click();

    // Sprawdź numer konta, saldo i walutę
    cy.get('.ng-binding').contains('1001').should('be.visible');
    cy.get('.ng-binding').contains('0').should('be.visible');
    cy.get('.ng-binding').contains('Rupee').should('be.visible');

    // Kliknij Deposit
    cy.contains('Deposit').click();

    // Wpłać 100
    cy.get('input[type="number"]').type('100');
    cy.get('form button[type="submit"]').click();

    // Sprawdź komunikat sukcesu i saldo
    cy.get('.error').should('contain', 'Deposit Successful');
    cy.get('.ng-binding').contains('100').should('be.visible');

    // Kliknij Withdrawl
    cy.contains('Withdrawl').click();

    // Wypłać 50
    cy.get('input[type="number"]').type('50');
    cy.get('form button[type="submit"]').click();

    // Sprawdź komunikat sukcesu i saldo
    cy.get('.error').should('contain', 'Transaction successful');
    cy.get('.ng-binding').contains('50').should('be.visible');

    // Kliknij Transactions i sprawdź obie transakcje
    cy.contains('Transactions').click();
    cy.get('table tbody tr').should('have.length', 2);
    cy.get('table tbody tr').first().should('contain', 'Deposit');
    cy.get('table tbody tr').last().should('contain', 'Withdrawal');

    // Kliknij Back
    cy.contains('Back').click();

    // Zmień numer konta
    cy.get('#accountSelect').select('1002');
    cy.contains('Transactions').click();

    // Sprawdź, że nie ma transakcji
    cy.get('table tbody tr').should('have.length', 0);

    // Kliknij Back i Logout
    cy.contains('Back').click();
    cy.contains('Logout').click();

    // Sprawdź, że użytkownik jest wylogowany
    cy.contains('Your Name :').should('be.visible');
  });
});
