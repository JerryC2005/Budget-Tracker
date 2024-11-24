
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

function isValidName(input, errMsg) {

    if (input === '') {
        console.log('please enter a valid name')
        errMsg.removeAttribute('hidden');
        return;
    }

    console.log('name is valid')
}

function isValidAmount(input, errMsg) {

    if (input === '' || isNaN(input) || input < 0) {
        console.log('Please enter a valid number');
        errMsg.removeAttribute("hidden");
        return;
    } else {
        console.log('num is valid');
    }
}

function clearMsg(errMsg) {
    if (errMsg && !errMsg.hasAttribute('hidden')) {
        errMsg.hidden = true;
    }
}

// function validateAll(errMsg1, errMsg2, inputName, inputNum) {
//     clearMsg(errMsg1);
//     clearMsg(errMsg2);

//     const nameValid = isValidName(inputName.value.trim(), errMsg1);
//     const amountValid = isValidAmount(inputNum.value.trim(), errMsg2)

//     if(nameValid && amountValid) {
//         console.log('good to go!')
//     }
// }

addIncomeBtn.addEventListener('click', () => {

    clearMsg(incomeError);
    clearMsg(incomeNumError);

    const nameValid = isValidName(incomeName.value.trim(), incomeError);
    const amountValid = isValidAmount(incomeAmount.value.trim(), incomeNumError)

    if(nameValid && amountValid) {
        console.log('good to go!')
    }
})

addExpenseBtn.addEventListener('click', () => {

    clearMsg(expenseError);
    clearMsg(expenseNumError);

    const nameValid = isValidName(expenseName.value.trim(), expenseError);
    const amountValid = isValidAmount(expenseAmount.value.trim(), expenseNumError)

    if(nameValid && amountValid) {
        console.log('good to go!')
    }
})