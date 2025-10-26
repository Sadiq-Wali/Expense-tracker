// Load transactions from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    updateBalance();
});

// Prevent Enter key from triggering form submit while typing
document.getElementById('transactionForm').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});


// Transaction class to store transaction details
class Transaction {
    constructor(name, amount, type, category, date) {
        this.name = name;
        this.amount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
        this.type = type;
        this.category = category || 'Uncategorized';
        this.date = date || new Date().toISOString().split('T')[0];
    }
}

// Load transactions from local storage
function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => addTransactionToDOM(transaction));
}

// Add new transaction
document.getElementById('transactionForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('transactionName').value;
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const type = document.getElementById('transactionType').value;
    const category = document.getElementById('transactionCategory').value;
    const date = document.getElementById('transactionDate').value;

    if (name === '' || isNaN(amount) || amount === 0) {
        alert('Please enter a valid name and amount');
        return;
    }

    const transaction = new Transaction(name, amount, type, category, date);
    addTransactionToDOM(transaction);
    saveTransaction(transaction);
    updateBalance();
    document.getElementById('transactionForm').reset();
});

// Add transaction to DOM
function addTransactionToDOM(transaction) {
    const transactionList = document.getElementById('transactionList');
    const li = document.createElement('li');
    li.classList.add('transaction-item');
    li.innerHTML = `
        <span>${transaction.name} (${transaction.category}, ${transaction.date}): $${transaction.amount.toFixed(2)} <span class="${transaction.type}">${transaction.type}</span></span>
        <button class="delete-btn" onclick="deleteTransaction(this)">Delete</button>
    `;
    transactionList.appendChild(li);
}

// Save transaction to local storage
function saveTransaction(transaction) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Delete transaction
function deleteTransaction(button) {
    const li = button.parentElement;
    const name = li.querySelector('span').firstChild.textContent.split(' (')[0];
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const updatedTransactions = transactions.filter(t => t.name !== name);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    li.remove();
    updateBalance();
}

// Update balance
function updateBalance() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

// Filter transactions by date
function filterByDate() {
    const startDate = document.getElementById('filterStartDate').value;
    const endDate = document.getElementById('filterEndDate').value;
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const filteredTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || transactionDate >= start) && (!end || transactionDate <= end);
    });
    updateTransactionList(filteredTransactions);
}

// Filter transactions by category
function filterByCategory() {
    const category = document.getElementById('filterCategory').value;
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const filteredTransactions = category === 'all' ? transactions : transactions.filter(t => t.category === category);
    updateTransactionList(filteredTransactions);
}

// Update transaction list display
function updateTransactionList(transactions) {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => addTransactionToDOM(transaction));
}

// Monthly summary
function showMonthlySummary() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const summary = {};
    transactions.forEach(t => {
        const month = new Date(t.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!summary[month]) summary[month] = { income: 0, expense: 0 };
        summary[month][t.type] += t.amount;
    });
    let summaryText = 'Monthly Summary:\n';
    for (let month in summary) {
        summaryText += `${month}: Income = $${summary[month].income.toFixed(2)}, Expense = $${(-summary[month].expense).toFixed(2)}\n`;
    }
    alert(summaryText);
}

// Export to CSV
function exportToCSV() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const csv = [
        ['Name', 'Amount', 'Type', 'Category', 'Date'],
        ...transactions.map(t => [t.name, t.amount.toFixed(2), t.type, t.category, t.date])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
}