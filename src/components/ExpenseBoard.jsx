import IncomeExpenseList from "./IncomeExpenseList";
import TotalBalance from "./TotalBalance";

import { useState } from "react";
import { expenseCategories, incomeCategories } from "../data/data";
import ExpenseTrackerForm from "./ExpenseTrackerForm";

export default function ExpenseBoard() {
  const [expenses, setExpenses] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  const handleSetDataToUpdate = (expense) => {
    setDataToUpdate(expense);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
  };

  const deleteExpense = (id) => {
    const confirm = window.confirm(
      "Are You Sure You want to delete this Item?"
    );
    if (!confirm) return;
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    setDataToUpdate(null);
  };

  const onUpdateExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === updatedExpense.id) {
        return updatedExpense;
      }
      return expense;
    });
    setExpenses(updatedExpenses);
    setDataToUpdate(null);
  };

  const totalIncome = expenses.reduce((acc, curr) => {
    return curr.type === "Income" ? acc + Number(curr.amount) : acc;
  }, 0);

  const totalExpense = expenses.reduce((acc, curr) => {
    return curr.type === "Expense" ? acc + Number(curr.amount) : acc;
  }, 0);

  const totalBalance = totalIncome - totalExpense;

  const incomeList = expenses.filter((expense) => expense.type === "Income");
  const expenseList = expenses.filter((expense) => expense.type === "Expense");

  return (
    <>
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ExpenseTrackerForm
            key={dataToUpdate ? dataToUpdate.id : "new"}
            type={dataToUpdate?.type}
            onAddExpense={addExpense}
            dataToUpdate={dataToUpdate}
            onUpdateExpense={onUpdateExpense}
          />
          <div className="lg:col-span-2">
            <TotalBalance
              income={totalIncome}
              expense={totalExpense}
              balance={totalBalance}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <IncomeExpenseList
                filterOptions={incomeCategories}
                type="income"
                data={incomeList}
                onDelete={deleteExpense}
                onEditClick={handleSetDataToUpdate}
              />
              <IncomeExpenseList
                filterOptions={expenseCategories}
                type="expense"
                data={expenseList}
                onDelete={deleteExpense}
                onEditClick={setDataToUpdate}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
