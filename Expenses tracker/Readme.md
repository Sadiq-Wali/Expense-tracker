# Personal Expense Tracker

## Project Description  
The **Personal Expense Tracker** is a simple and interactive web application designed to help users manage their income and expenses efficiently.  
It allows users to add, view, and delete transactions, automatically updates their balance, and stores all data in the browser’s local storage.  

This project helps in practicing **JavaScript DOM manipulation**, **Local Storage handling**, and **form validation**, along with creating a clean and responsive **user interface** using HTML and CSS.

---

##  Features  

### Core Functionality  
- Add new income and expense transactions with name, amount, and type.  
- View all transactions in a clean, scrollable list.  
- Delete unwanted transactions easily.  
- Automatically calculate and display the total balance.  
- Store data in **Local Storage** so it remains after refreshing or reopening the page.  
- Validate user inputs to prevent empty or invalid entries.  

---

## Technologies Used  
- HTML5 – for structure  
- CSS3 – for design and layout  
- JavaScript (ES6) – for logic and DOM updates  
- Local Storage API – for data persistence  

---

## User Interface Layout  

### Sections  
1. **Current Balance** – Displays total (income - expenses).  
2. **Add New Transaction** – Input fields for transaction name, amount, and type.  
3. **Transaction History** – Displays all transactions with delete functionality and type-based color styling.  

---

## Project Structure  

The project consists of three main files:  
- **index.html** – Defines the structure and content of the application.  
- **style.css** – Styles the layout and improves visual appearance.  
- **script.js** – Contains all the functionality and logic.  

---

## Implementation Overview  

1. **HTML Structure:**  
   The layout includes a balance section, a transaction input form, and a transaction history list.  

2. **CSS Styling:**  
   A simple, responsive design with a white container, subtle shadows, and distinct color styles for income and expenses.  

3. **JavaScript Functionality:**  
   - Loads transactions from Local Storage when the page opens.  
   - Adds new transactions and updates the displayed list dynamically.  
   - Calculates total income, expenses, and current balance automatically.  
   - Allows users to delete specific transactions and updates data accordingly.  
   - Validates form inputs before adding transactions.  

---

##  Local Storage Details  
All transactions are stored locally in the browser using Local Storage.  
This ensures data persistence, meaning all transactions remain saved even after a page refresh or browser restart.  

---

## Validation Rules  
- Transaction name and amount fields are required.  
- Amount must be greater than zero.  
- Prevents saving of empty or invalid transactions.  
- Displays warning messages for missing fields.  

---

## Optional Enhancements  
- Add a date picker to filter transactions by date or time range.  
- Include category options (like “Groceries”, “Rent”, “Salary”).  
- Show a monthly income and expense summary.  
- Allow exporting data to a CSV file.  

---

## Testing Checklist  
- Adding and deleting transactions works correctly.  
- Balance updates dynamically.  
- Data persists after refreshing the browser.  
- Form validation prevents invalid entries.  
- UI looks clean and works across devices.  

---

## Assessment Criteria  

| Criteria | Description |
|-----------|--------------|
| Functionality | App performs all required tasks accurately |
| User Interface | Design is simple, responsive, and user-friendly |
| Code Quality | Well-structured and properly commented |
| Error Handling | Manages empty or invalid inputs gracefully |
| Extra Features | Optional enhancements implemented effectively |

---

