before(async () => {
  window.indexedDB.deleteDatabase('Vocabulary');

  await window.navigator.serviceWorker
    .getRegistrations()
    .then(registrations => Promise.all(registrations.map(registration => registration.unregister())));
});

beforeEach(() => {
  cy.visit('/#/seed');

  cy.findByRole('button', { name: /seed/i }).click();

  cy.findByText('seeding...').should('not.exist');

  cy.findByText('success');

  cy.visit('/#/');

  cy.findByRole('status').should('not.exist');

  cy.hash().should('eq', '#/list');
});

// TODO: write tests for navigation
it.skip('test navigation', () => {});

it('test terms list page', () => {
  cy.findByRole('cell', { name: 'car' })
    .parent('tr')
    .findByRole('button', { name: /delete/i })
    .click();

  cy.findByText('OK').click();

  cy.findByRole('status').should('not.exist');

  cy.findAllByRole('cell', { name: 'car' }).should('not.exist');

  cy.findByRole('cell', { name: 'computer' })
    .parent('tr')
    .findByRole('button', { name: /delete/i })
    .click();

  cy.findByText('OK').click();

  cy.findByRole('status').should('not.exist');

  cy.findAllByRole('cell', { name: 'computer' }).should('not.exist');
});

it('test terms creation page', () => {
  cy.findByRole('status').should('not.exist');

  cy.hash().should('eq', '#/list');

  // should create 1st record
  cy.findByRole('button', { name: /add/i }).click();

  cy.hash().should('eq', '#/record');

  cy.findByRole('textbox', { name: /word/i }).type('apple').should('have.value', 'apple');

  cy.findByRole('textbox', { name: /part of speech/i })
    .type('noun')
    .should('have.value', 'noun');

  cy.findByRole('textbox', { name: /translation/i })
    .type('jablko')
    .should('have.value', 'jablko');

  cy.findByRole('textbox', { name: /definition/i })
    .type('a round fruit with red or green skin and firm white flesh')
    .should('have.value', 'a round fruit with red or green skin and firm white flesh');

  cy.findByRole('button', { name: /confirm/i }).click();

  cy.findByRole('status').should('not.exist');

  cy.hash().should('eq', '#/list');

  cy.findByRole('cell', { name: 'apple' }).should('exist');

  // it('should create 2nd record', () => {
  cy.findByRole('button', { name: /add/i }).click();

  cy.hash().should('eq', '#/record');

  cy.findByRole('textbox', { name: /word/i }).type('banana');

  cy.findByRole('textbox', { name: /part of speech/i })
    .type('noun')
    .should('have.value', 'noun');

  cy.findByRole('textbox', { name: /translation/i })
    .type('banan')
    .should('have.value', 'banan');
  cy.findByRole('textbox', { name: /definition/i })
    .type('a long curved fruit which grows in clusters and has soft pulpy flesh and yellow skin when ripe')
    .should(
      'have.value',
      'a long curved fruit which grows in clusters and has soft pulpy flesh and yellow skin when ripe',
    );
  cy.findByRole('button', { name: /confirm/i }).click();

  cy.findByRole('status').should('not.exist');

  cy.hash().should('eq', '#/list');

  cy.findByRole('cell', { name: 'banana' }).should('exist');
});

it('test term edit page', () => {
  cy.findByRole('cell', { name: 'car' }).parent('tr').findByRole('button', { name: /edit/i }).click();

  cy.findByRole('status').should('not.exist');

  cy.hash().should('match', /^#\/record\/\d+$/);

  cy.findByRole('button', { name: /cancel/i }).click();

  cy.findByRole('status').should('not.exist');

  cy.hash().should('eq', '#/list');
});

it('test practice page', () => {
  cy.visit('/#/practice');

  // it('should start practice session', () => {
  cy.findByRole('button', { name: /start session/i }).click();

  cy.findByRole('status').should('not.exist');

  // it('should edit practicing term', () => {
  cy.findByRole('button', { name: /edit/i }).click();

  cy.findByRole('status').should('not.exist');

  cy.hash().should('match', /^#\/record\/\d+$/);

  cy.findByRole('button', { name: /cancel/i }).click();

  cy.findByRole('status').should('not.exist');

  cy.hash().should('eq', '#/practice');

  // it('should go through practice session', () => {
  cy.findByRole('button', { name: /reveal answer/i }).click();

  cy.findByRole('button', { name: /i was correct/i }).click();

  cy.findByRole('status').should('not.exist');

  cy.findByRole('button', { name: /reveal answer/i }).click();

  cy.findByRole('button', { name: /i was incorrect/i }).click();

  cy.findByRole('button', { name: /end session/i }).click();

  cy.hash().should('eq', '#/practice');
});
