let expenses = [];

// LOAD saved data
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("expenses");
  if (saved) {
    expenses = JSON.parse(saved);
  }

  document.getElementById("addBtn").addEventListener("click", addExpense);
  render();
});

function addExpense() {
  const name = document.getElementById("nameInput").value.trim();
  const amount = parseFloat(document.getElementById("amountInput").value);

  if (!name || isNaN(amount)) return;

  expenses.push({ name, amount });

  document.getElementById("nameInput").value = "";
  document.getElementById("amountInput").value = "";

  saveData();
  render();
}

function render() {
  const list = document.getElementById("expenseList");
  const totalEl = document.getElementById("total");

  list.innerHTML = "";

  let total = 0;

  expenses.forEach((exp, index) => {
    total += exp.amount;

    const li = document.createElement("li");
    li.textContent = `${exp.name} paid ₹${exp.amount}`;

    li.addEventListener("click", () => {
      expenses.splice(index, 1);
      saveData();
      render();
    });

    list.appendChild(li);
  });

  totalEl.textContent = total;
}

function saveData() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

