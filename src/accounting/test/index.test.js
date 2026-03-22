const AccountSystem = require('../index');

describe('AccountSystem', () => {
  let app;
  let consoleSpy;

  beforeEach(() => {
    app = new AccountSystem();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('TC-001: View Current Account Balance', () => {
    app.viewBalance();
    expect(consoleSpy).toHaveBeenCalledWith('Current balance: 1000.00');
  });

  test('TC-002: Credit Account with Valid Amount', () => {
    app.rl.question = jest.fn((query, callback) => callback('500.00'));
    app.creditAccount();
    expect(app.readBalance()).toBe(1500.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1500.00');
  });

  test('TC-003: Debit Account with Sufficient Funds', () => {
    app.rl.question = jest.fn((query, callback) => callback('300.00'));
    app.debitAccount();
    expect(app.readBalance()).toBe(700.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 700.00');
  });

  test('TC-004: Debit Account with Insufficient Funds', () => {
    app.rl.question = jest.fn((query, callback) => callback('1500.00'));
    app.debitAccount();
    expect(app.readBalance()).toBe(1000.00);
    expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
  });

  test('TC-005: Multiple Sequential Operations', () => {
    // Credit 200
    app.rl.question = jest.fn((query, callback) => callback('200.00'));
    app.creditAccount();
    expect(app.readBalance()).toBe(1200.00);

    // View balance
    app.viewBalance();
    expect(consoleSpy).toHaveBeenCalledWith('Current balance: 1200.00');

    // Debit 500
    app.rl.question = jest.fn((query, callback) => callback('500.00'));
    app.debitAccount();
    expect(app.readBalance()).toBe(700.00);

    // View balance
    app.viewBalance();
    expect(consoleSpy).toHaveBeenCalledWith('Current balance: 700.00');
  });

  test('TC-008: Credit with Zero Amount', () => {
    app.rl.question = jest.fn((query, callback) => callback('0.00'));
    app.creditAccount();
    expect(app.readBalance()).toBe(1000.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1000.00');
  });

  test('TC-009: Debit Exact Balance Amount', () => {
    app.rl.question = jest.fn((query, callback) => callback('1000.00'));
    app.debitAccount();
    expect(app.readBalance()).toBe(0.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 0.00');
  });

  test('TC-010: Credit Large Amount', () => {
    app.rl.question = jest.fn((query, callback) => callback('999999.99'));
    app.creditAccount();
    expect(app.readBalance()).toBe(1000999.99);
    expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1000999.99');
  });

  test('TC-011: Debit After Multiple Credits', () => {
    // Credit 100
    app.rl.question = jest.fn((query, callback) => callback('100.00'));
    app.creditAccount();
    expect(app.readBalance()).toBe(1100.00);

    // Credit 200
    app.rl.question = jest.fn((query, callback) => callback('200.00'));
    app.creditAccount();
    expect(app.readBalance()).toBe(1300.00);

    // Debit 150
    app.rl.question = jest.fn((query, callback) => callback('150.00'));
    app.debitAccount();
    expect(app.readBalance()).toBe(1150.00);

    // View
    app.viewBalance();
    expect(consoleSpy).toHaveBeenCalledWith('Current balance: 1150.00');
  });

  // For menu tests, since run() is callback-based, test displayMenu
  test('Display Menu', () => {
    app.displayMenu();
    expect(consoleSpy).toHaveBeenCalledWith('--------------------------------');
    expect(consoleSpy).toHaveBeenCalledWith('Account Management System');
    expect(consoleSpy).toHaveBeenCalledWith('1. View Balance');
    expect(consoleSpy).toHaveBeenCalledWith('2. Credit Account');
    expect(consoleSpy).toHaveBeenCalledWith('3. Debit Account');
    expect(consoleSpy).toHaveBeenCalledWith('4. Exit');
    expect(consoleSpy).toHaveBeenCalledWith('--------------------------------');
  });

  // TC-006 and TC-007 would require testing run(), but since it's interactive, perhaps skip or mock extensively.
  // For now, focus on business logic tests.
});