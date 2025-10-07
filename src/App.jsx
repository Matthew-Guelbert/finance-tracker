import { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-09-26", description: "Groceries", amount: -45.23, category: "Food" },
    { id: 2, date: "2025-09-25", description: "Salary", amount: 1500.0, category: "Income" },
    { id: 3, date: "2025-09-24", description: "Electric Bill", amount: -120.5, category: "Utilities" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Finance Tracker</h1>

      <div className="bg-red-500 text-white p-4 mb-6 rounded">
        Tailwind is working!
      </div>

      {/* Add Transaction Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const newTxn = {
            id: Date.now(),
            date: form.date.value,
            description: form.description.value,
            amount: parseFloat(form.amount.value),
            category: form.category.value,
          };
          setTransactions([newTxn, ...transactions]);
          form.reset();
        }}
        className="mb-6 flex flex-wrap gap-2 items-end"
      >
        <input name="date" type="date" className="border p-2 rounded" required />
        <input name="description" placeholder="Description" className="border p-2 rounded" required />
        <input name="amount" type="number" step="0.01" placeholder="Amount" className="border p-2 rounded" required />
        <input name="category" placeholder="Category" className="border p-2 rounded" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add
        </button>
      </form>

      {/* Transactions Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{txn.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{txn.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{txn.category}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${
                    txn.amount < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {txn.amount < 0 ? "-" : ""}${Math.abs(txn.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      setTransactions(transactions.filter((t) => t.id !== txn.id))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
