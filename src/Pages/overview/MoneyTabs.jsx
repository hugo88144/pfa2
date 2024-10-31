/* eslint-disable react/prop-types */
function MoneyTabs({ current, income, expenses }) {
  return (
    <div className="w-full grid grid-cols-3 gap-12 max-500:grid-cols-1">
      <div className="bg-gray-900 text-white rounded-xl w-full h-44 flex flex-col p-8 gap-6 max-500:rounded-2xl">
        <h3 className="text-gray-300 text-2xl ml-2">Current balance</h3>
        <div className="font-bold text-5xl">$ {current}</div>
      </div>
      <div className="bg-white rounded-lg w-full h-44 flex flex-col p-8 gap-6">
        <h3 className="text-gray-400 text-2xl ml-2">Income</h3>
        <div className="font-bold text-5xl">$ {income}</div>
      </div>
      <div className="bg-white rounded-lg w-full h-44 flex flex-col p-8 gap-6">
        <h3 className="text-gray-400 text-2xl ml-2">Expenses</h3>
        <div className="font-bold text-5xl">$ {expenses}</div>
      </div>
    </div>
  );
}

export default MoneyTabs;
