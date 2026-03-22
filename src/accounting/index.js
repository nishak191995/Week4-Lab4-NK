const readline = require('readline');

class AccountSystem {
    constructor() {
        this.balance = 1000.00;
        this.continueFlag = true;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Data layer - equivalent to data.cob
    readBalance() {
        return this.balance;
    }

    writeBalance(newBalance) {
        this.balance = newBalance;
    }

    // Operations layer - equivalent to operations.cob
    viewBalance() {
        const currentBalance = this.readBalance();
        console.log(`Current balance: ${currentBalance.toFixed(2)}`);
    }

    creditAccount() {
        const currentBalance = this.readBalance();
        this.rl.question('Enter credit amount: ', (input) => {
            const amount = parseFloat(input);
            const newBalance = currentBalance + amount;
            this.writeBalance(newBalance);
            console.log(`Amount credited. New balance: ${newBalance.toFixed(2)}`);
        });
    }

    debitAccount() {
        const currentBalance = this.readBalance();
        this.rl.question('Enter debit amount: ', (input) => {
            const amount = parseFloat(input);
            if (currentBalance >= amount) {
                const newBalance = currentBalance - amount;
                this.writeBalance(newBalance);
                console.log(`Amount debited. New balance: ${newBalance.toFixed(2)}`);
            } else {
                console.log('Insufficient funds for this debit.');
            }
        });
    }

    displayMenu() {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');
    }

    // Main logic - equivalent to main.cob
    run() {
        const processChoice = () => {
            if (!this.continueFlag) {
                console.log('Exiting the program. Goodbye!');
                this.rl.close();
                return;
            }
            this.displayMenu();
            this.rl.question('Enter your choice (1-4): ', (input) => {
                const choice = parseInt(input);
                switch (choice) {
                    case 1:
                        this.viewBalance();
                        processChoice();
                        break;
                    case 2:
                        this.creditAccount();
                        setTimeout(processChoice, 100); // Simulate async for input
                        break;
                    case 3:
                        this.debitAccount();
                        setTimeout(processChoice, 100);
                        break;
                    case 4:
                        this.continueFlag = false;
                        processChoice();
                        break;
                    default:
                        console.log('Invalid choice, please select 1-4.');
                        processChoice();
                }
            });
        };
        processChoice();
    }
}

// Run the application
const app = new AccountSystem();
app.run();

module.exports = AccountSystem;