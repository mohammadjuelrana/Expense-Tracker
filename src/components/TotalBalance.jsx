import BalanceCard from "./BalanceCard";

export default function TotalBalance({ income, expense, balance }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-1 text-center lg:grid-cols-3 divide-x-2 border rounded-md overflow-hidden">
          <BalanceCard title="Balance" amount={balance} />
          <BalanceCard title="Total Income" amount={income} />
          <BalanceCard title="Total Expense" amount={expense} />
        </dl>
      </div>
    </div>
  );
}
