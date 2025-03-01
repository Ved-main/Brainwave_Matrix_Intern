const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const addBtn = document.getElementById('add-btn');
const balanceElement = document.getElementById('balance');
const incomeList = document.getElementById('income-list');
const expenseList = document.getElementById('expense-list');

let transactions = [];

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar', 
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Amount',
            data: [0, 0],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)', 
                'rgba(255, 99, 132, 0.2)'  
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)', 
                'rgba(255, 99, 132, 1)'  
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


if (localStorage.getItem('transactions')) {
    transactions = JSON.parse(localStorage.getItem('transactions'));
    updateUI();
}


addBtn.addEventListener('click', () => {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (description && !isNaN(amount)) {
        const transaction = { description, amount, type };
        transactions.push(transaction);
        saveTransactions();
        updateUI();
        clearInputs();
    } else {
        alert('Please fill in all fields correctly.');
    }
});

function updateUI() {
    
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${transaction.description} - ₹${transaction.amount.toFixed(2)}</span>
            <button onclick="deleteTransaction(${index})"><i class="fas fa-trash"></i></button>
        `;

        if (transaction.type === 'income') {
            incomeList.appendChild(li);
            totalIncome += transaction.amount;
        } else {
            expenseList.appendChild(li);
            totalExpense += transaction.amount;
        }
    });

 
    const totalBalance = totalIncome - totalExpense;
    balanceElement.textContent = `₹${totalBalance.toFixed(2)}`;
    balanceElement.style.color = totalBalance >= 0 ? '#28a745' : '#dc3545';

    
    myChart.data.datasets[0].data = [totalIncome, totalExpense];
    myChart.update();
}


function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveTransactions();
    updateUI();
}


function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


function clearInputs() {
    descriptionInput.value = '';
    amountInput.value = '';
    typeInput.value = 'income';
}