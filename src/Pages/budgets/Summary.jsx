/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";
import BudgetChart from "./BudgetChart";

function Summary({ data, budgetTotal, budgetData }) {
  const spentTotal = budgetData.reduce((total, item) => total + item.spent, 0);

  return (
    <div className="flex rounded-2xl flex-col gap-6 h-fit bg-white max-1000:flex-row max-800:flex-col  ">
      <div className="relative text-center px-40  py-14   max-900:px-0 max-900:mx-auto">
        <div className="text-5xl font-bold absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
          ${spentTotal}
          <p className="text-gray-500 text-lg ">
            of {formatCurrency(budgetTotal)} limit
          </p>
        </div>
        <BudgetChart data={data} />
      </div>

      <div className=" grid grid-cols gird-rows-4 gap-10 p-10 h-fit max-800:p-20">
        <h3 className="text-4xl font-bold p-10">Spending Summary</h3>
        {budgetData &&
          budgetData.map((item, index) => (
            <div
              key={index}
              style={{ borderColor: item.theme }}
              className=" p-3 w-full flex  justify-between border-l-4  "
            >
              <p className="text-gray-800 text-3xl mr-4">{item.category}</p>

              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">
                  {formatCurrency(item.spent)}
                </p>
                <p className="text-gray-800 text-2xl">
                  of {formatCurrency(item.maximum)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Summary;
