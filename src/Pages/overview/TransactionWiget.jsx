import { useSelector } from "react-redux";

import SubTitle from "../../ui/SubTitle";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { getTransactions } from "../transactions/transactionSlice";

function TransactionWiget() {
  const data = useSelector(getTransactions);

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="flex bg-white rounded-xl  flex-col p-8">
      <SubTitle to="/transactions">Transactions</SubTitle>

      {sortedData &&
        sortedData
          .map((item, index) => (
            <div key={index} className="flex justify-between p-6">
              <div className="flex gap-4 items-center ">
                <img src={item.avatar} alt="" className="w-16 rounded-full" />
                <p className="text-2xl font-bold">{item.name}</p>
              </div>
              <div className="space-y-2 flex flex-col items-end">
                <div
                  className="text-2xl font-bold text-green-700"
                  style={{ color: item.amount > 0 ? "green" : "red" }}
                >
                  {formatCurrency(item.amount)}
                </div>
                <div className="text-gray-500 text-xl">
                  {formatDate(item.date)}
                </div>
              </div>
            </div>
          ))
          .slice(0, 7)}
    </div>
  );
}

export default TransactionWiget;
