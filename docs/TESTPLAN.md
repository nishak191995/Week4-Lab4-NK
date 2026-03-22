# COBOL Student Account Management System - Test Plan

This test plan covers the business logic and functionality of the COBOL-based student account management system. It is designed to validate the system's behavior against business requirements and will serve as the foundation for creating unit and integration tests in the Node.js transformation.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|-----------------|----------------|-------------------|----------|
| TC-001 | View Current Account Balance | Application is running, initial balance is $1000.00 | 1. Start the application<br>2. Select option 1 (View Balance) | Current balance of $1000.00 is displayed |  |  | Initial balance verification |
| TC-002 | Credit Account with Valid Amount | Application is running, initial balance is $1000.00 | 1. Start the application<br>2. Select option 2 (Credit Account)<br>3. Enter amount 500.00 when prompted | Balance is updated to $1500.00 and displayed |  |  | Positive credit operation |
| TC-003 | Debit Account with Sufficient Funds | Application is running, initial balance is $1000.00 | 1. Start the application<br>2. Select option 3 (Debit Account)<br>3. Enter amount 300.00 when prompted | Balance is updated to $700.00 and displayed |  |  | Valid debit operation |
| TC-004 | Debit Account with Insufficient Funds | Application is running, initial balance is $1000.00 | 1. Start the application<br>2. Select option 3 (Debit Account)<br>3. Enter amount 1500.00 when prompted | "Insufficient funds for this debit." message is displayed, balance remains $1000.00 |  |  | Business rule validation |
| TC-005 | Multiple Sequential Operations | Application is running, initial balance is $1000.00 | 1. Start the application<br>2. Select option 2, credit $200.00<br>3. Select option 1, verify balance is $1200.00<br>4. Select option 3, debit $500.00<br>5. Select option 1, verify balance is $700.00 | Each operation completes successfully with correct balance updates |  |  | State persistence across operations |
| TC-006 | Invalid Menu Choice | Application is running | 1. Start the application<br>2. Enter invalid choice (e.g., 5) | "Invalid choice, please select 1-4." message is displayed, menu is shown again |  |  | Input validation |
| TC-007 | Exit Application | Application is running | 1. Start the application<br>2. Select option 4 (Exit) | "Exiting the program. Goodbye!" message is displayed, application terminates |  |  | Clean application shutdown |
| TC-008 | Credit with Zero Amount | Application is running, initial balance is $1000.00 | 1. Start the application<br>2. Select option 2 (Credit Account)<br>3. Enter amount 0.00 when prompted | Balance remains $1000.00 (no change) |  |  | Edge case: zero credit |
| TC-009 | Debit Exact Balance Amount | Application is running, balance is $1000.00 | 1. Start the application<br>2. Select option 3 (Debit Account)<br>3. Enter amount 1000.00 when prompted | Balance is updated to $0.00 and displayed |  |  | Edge case: exact balance debit |
| TC-010 | Credit Large Amount | Application is running, initial balance is $1000.00 | 1. Start the application<br>2. Select option 2 (Credit Account)<br>3. Enter amount 999999.99 when prompted | Balance is updated to $1000999.99 and displayed |  |  | Large amount handling (6 digits + 2 decimals) |
| TC-011 | Debit After Multiple Credits | Application is running, initial balance is $1000.00 | 1. Start the application<br>2. Select option 2, credit $100.00<br>3. Select option 2, credit $200.00<br>4. Select option 3, debit $150.00<br>5. Select option 1 to view balance | Final balance is $1150.00 |  |  | Complex transaction sequence |
| TC-012 | Menu Loop Functionality | Application is running | 1. Start the application<br>2. Select option 1<br>3. Select option 6 (invalid)<br>4. Select option 4 | Menu continues to display after invalid choice, exits cleanly on valid exit choice |  |  | Menu persistence and error handling |

## Test Execution Guidelines

### Environment Setup
- COBOL compiler (cobc) installed
- Application compiled with: `cobc -x src/cobol/main.cob src/cobol/operations.cob src/cobol/data.cob -o accountsystem`
- Run in terminal environment

### Test Data
- Initial balance: $1000.00
- Test amounts should cover: positive values, zero, exact balance, insufficient amounts, maximum allowed values

### Business Rules Validation
- All monetary values use 6 digits before decimal and 2 after (PIC 9(6)V99 format)
- Debit operations require sufficient balance
- Balance state persists throughout application session
- Invalid inputs are handled gracefully with appropriate error messages

### Coverage Areas
- **Functional Testing**: All menu options and operations
- **Negative Testing**: Invalid inputs, insufficient funds
- **Edge Case Testing**: Boundary values, zero amounts
- **Integration Testing**: Data flow between modules (main.cob ↔ operations.cob ↔ data.cob)

This test plan will be used to validate the current COBOL implementation and ensure the Node.js transformation maintains equivalent functionality and business rules.