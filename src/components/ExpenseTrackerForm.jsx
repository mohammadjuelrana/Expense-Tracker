import { useState } from "react";
import { expenseCategories, incomeCategories } from "../data/data.js";
import Tabs from "./Tabs";

const expenseCategoriesList = expenseCategories.map((category) => (
  <option key={category}>{category}</option>
));
const incomeCategoriesList = incomeCategories.map((category) => (
  <option key={category}>{category}</option>
));

export default function ExpenseTrackerForm({
  type,
  onAddExpense,
  dataToUpdate,
  onUpdateExpense,
}) {
  const [expenseType, setExpenseType] = useState(type ?? "Expense");
  const [expense, setExpense] = useState(
    dataToUpdate ?? {
      category: "",
      amount: "",
      date: "",
    }
  );
  const [id, setId] = useState(dataToUpdate?.id);

  if (dataToUpdate?.id && id !== dataToUpdate?.id) {
    setExpense(dataToUpdate);
    setExpenseType(dataToUpdate.type);
    setId(dataToUpdate.id);
    return;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const defaultCategory =
      expenseType === "Expense" ? expenseCategories[0] : incomeCategories[0];
    const payload = {
      ...expense,
      category: expense.category || defaultCategory,
      type: expenseType,
    };
    if (dataToUpdate) {
      onUpdateExpense({ ...payload, id: dataToUpdate.id });
    } else {
      onAddExpense(payload);
    }
    setExpense({
      category: "",
      amount: "",
      date: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form onSubmit={handleSubmit}>
        <Tabs
          activeTab={expenseType}
          setActiveTab={(tab) => setExpenseType(tab)}
          tabs={["Expense", "Income"]}
        />

        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              required
              id="category"
              name="category"
              autoComplete="category-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={expense.category}
              onChange={handleChange}
            >
              {expenseType === "Expense"
                ? expenseCategoriesList
                : incomeCategoriesList}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              required
              type="number"
              name="amount"
              id="amount"
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={expense.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              required
              type="date"
              name="date"
              id="date"
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={expense.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
