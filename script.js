
//input box
const incomeName = document.getElementById('income-name');
const incomeAmount = document.getElementById('income-amount');
const expenseName = document.getElementById('expenses-name');
const expenseAmount = document.getElementById('expenses-amount');

//buttons
const addIncomeBtn = document.getElementById('add-income-btn');
const addExpenseBtn = document.getElementById('add-expenses-btn');
const delBtn = document.getElementById('del-budget-line');

//display errors 
const incomeError = document.getElementById('income-error');
const incomeNumError = document.getElementById('income-num-error');
const expenseError = document.getElementById('expense-error');
const expenseNumError = document.getElementById('expense-num-error');

// display everthing



//table
const table = document.getElementById('table')

//initialize serial number
serialNum = 1

// validates name input
function isValidName(input, errMsg) {

    if (input === '') {
        console.log('please enter a valid name')
        errMsg.removeAttribute('hidden');//show error message
        return false;;
    } else {
        console.log('name is valid')
        return true; 
    }

}

//validate amount input
function isValidAmount(input, errMsg) {

    if (input === '' || isNaN(input) || input < 0) {
        console.log('Please enter a valid number');
        errMsg.removeAttribute("hidden"); // show error message
        return false;
    } else {
        console.log('num is valid');
        return true;
    }
}

//clears error messages
function clearMsg(errMsg) {
    if (errMsg && !errMsg.hasAttribute('hidden')) {
        errMsg.hidden = true;
    }
}

//function to add row
function addRow(serialNum, name, amount, type) {
    //creates and adds class to row element
    const row = document.createElement('tr')
    row.classList.add('budget-line')

    //write in the html
    row.innerHTML = `
    <td>${serialNum}</td>
    <td>${name}</td>
    <td>$${amount}</td>
    <td>${type}</td>
    <td><button class="del-budget-line">- Delete</button></td>
    `;

    //append the row to the table body
    table.appendChild(row);

    //deletes row
    const delRow = row.querySelector('.del-budget-line');
    //deletes row when delete button is pressed
    delRow.addEventListener('click', () => {
        row.remove(); //remove the row
        updateSerialNum(); // updates the Serial numbers

        //removes the income or expense from the budget object
        if(type === 'Income') {
            myBudget.removeIncome(name, amount)
        } else {
            myBudget.removeExpense(name, amount)
        }

        //updates the display after removing the row
        updateDisplay();
    })

}

//function to update the serial nums after each row is created
function updateSerialNum() {
    const rows = table.querySelectorAll('tr'); // gets all the rows
    let newSerial = 1;  // reset serial num

    //update serial num for each row
    rows.forEach((row) => {
        row.cells[0].textContent = newSerial++; // update first cell with new num the tr
    });

    serialNum = newSerial; // updates the global serial num
}

//function to update the display (balance, income, expense)
function updateDisplay() {
    const summary = myBudget.getBudgetSummary(); //gets updated budget

    //update display El with the current totals
    document.getElementById('display-balance').textContent = `Total balance: $${summary.totalBudget}`;
    document.getElementById('display-income').textContent = `Total Income: $${summary.totalIncome}`;
    document.getElementById('display-expense').textContent = `Total Expenses: $${summary.totalExpenses}`;
}



// budget class that tracks everthing budget related
class Budget {
    constructor() {
        this.income = []; // store income items
        this.expenses = []; // store expense items
    }

    // add income to budget
    addIncome(description, amount) {
        this.income.push({description, amount})
    }

    // add expense to budget
    addExpense(description, amount) {
        this.expenses.push({description, amount})
    }
    //remove income from budget by matching with the income item
    removeIncome(description, amount) {
        this.income = this.income.filter(item => item.description !== description || item.amount !== Number(amount));
    }

    //remove income from budget by matching with the expense item
    removeExpense(description, amount) {
        this.expenses = this.expenses.filter(item => item.description !== description || item.amount !== Number(amount));
    }

    //calculate total income
    getTotalIncome() {
        return this.income.reduce((sum, input) => sum + input.amount, 0);
    }

    //calculates total expense
    getTotalExpenses() {
        return this.expenses.reduce((sum, input) => sum + input.amount, 0);
    }

    // calculate total budget (income - expenses)
    getBudgetTotal() { 
        return this.getTotalIncome() - this.getTotalExpenses();
    }
    
    // get a summary of the budget
    getBudgetSummary() {
        return {
            totalIncome: this.getTotalIncome(),
            totalExpenses: this.getTotalExpenses(),
            totalBudget: this.getBudgetTotal(),
        }
    }
}


// init a new budget instance to manage users budget
const myBudget = new Budget();

//when add button is clicked on Income section
addIncomeBtn.addEventListener('click', () => {
    //clears any errors that you resolved
    clearMsg(incomeError);
    clearMsg(incomeNumError);

    // validates name and amount
    const nameValid = isValidName(incomeName.value.trim(), incomeError);
    const amountValid = isValidAmount(incomeAmount.value.trim(), incomeNumError)

    // if both income name and amount are valid starts calculating
    if(nameValid && amountValid) {
        console.log('good to go!');

        //add income to budget
        myBudget.addIncome(incomeName.value, Number(incomeAmount.value));

        //add row info
        addRow(serialNum, incomeName.value, incomeAmount.value, 'Income');
        serialNum++; // increments serial num by global serialNum

        // clears the input fields after each button click is successful
        incomeName.value = '';
        incomeAmount.value = '';

        // updates display
        updateDisplay();
    };

})


// when add button is clicked on expense section 
addExpenseBtn.addEventListener('click', () => {
    //clears error messages that have been resolved
    clearMsg(expenseError);
    clearMsg(expenseNumError);

    //validates name and amount 
    const nameValid = isValidName(expenseName.value.trim(), expenseError);
    const amountValid = isValidAmount(expenseAmount.value.trim(), expenseNumError)

    //if name and amount are valid proceed
    if(nameValid && amountValid) {
        console.log('good to go!')

        //add row and info to it
        addRow(serialNum, expenseName.value, expenseAmount.value, 'Expense');
        serialNum++;

        // add all expenses together
        myBudget.addExpense(expenseName.value, Number(expenseAmount.value));
        //clears expense input fields
        expenseName.value = '';
        expenseAmount.value = '';
        //updates display
        updateDisplay()
    }


})