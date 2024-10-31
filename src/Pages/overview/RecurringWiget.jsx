import { useSelector, useDispatch } from "react-redux";
import SubTitle from "../../ui/SubTitle";
import { useEffect } from "react";

import { formatCurrency } from "../../utils/helpers";

import { getReData, setRecurringData } from "../recurringBills/recurringSlice";
import { computeBillTotals } from "../../utils/computeBills";
import { getRecurringTransactions } from "../transactions/transactionSlice";

function RecurringWiget() {
  const data = useSelector(getReData);
  const recurringTransactions = useSelector(getRecurringTransactions); // Fetch recurring transactions
  const dispatch = useDispatch();
  const today = new Date();
  const day = today.getDate();

  useEffect(() => {
    // Combine recurring data from both slices inside useEffect
    const ReData = [
      ...(data.recurring || []),
      ...(recurringTransactions || []),
    ];

    // Call the utility function to compute totals
    const computedAmounts = computeBillTotals(ReData, day);

    // Dispatch computed amounts and total
    dispatch(setRecurringData(computedAmounts));
  }, [dispatch, data.recurring, recurringTransactions, day]); // Include dependencies

  const { paidBills, totalUpcoming, dueSoon } = useSelector(getReData);

  if (!data) {
    // Show a loading or empty state when data is not yet available
    return <div>Loading recurring bills...</div>;
  }
  return (
    <div className="flex bg-white rounded-xl h-auto p-10 w-full flex-col gap-6">
      <SubTitle to="/recurringBills">Recurring Bills</SubTitle>

      <div className="flex justify-between mx-6 p-10 bg-[#F8F4F0]  border-l-4 border-green-600 rounded-xl">
        <div className="flex gap-4 items-center  ">
          <p className="text-2xl font-bold">Paid bills</p>
        </div>
        <div className="text-2xl font-bold">
          {formatCurrency(Math.abs(paidBills))}
        </div>
      </div>

      <div className="flex justify-between mx-6 p-10 bg-[#F8F4F0]  border-l-4 border-yellow-400 rounded-xl">
        <div className="flex gap-4 items-center  ">
          <p className="text-2xl font-bold">Total Upcoming</p>
        </div>
        <div className="text-2xl font-bold">
          {formatCurrency(Math.abs(totalUpcoming))}
        </div>
      </div>

      <div className="flex justify-between mx-6 p-10 bg-[#F8F4F0]  border-l-4 border-red-500 rounded-xl">
        <div className="flex gap-4 items-center  ">
          <p className="text-2xl font-bold">Due Soon</p>
        </div>
        <div className="text-2xl font-bold">
          {formatCurrency(Math.abs(dueSoon))}
        </div>
      </div>
    </div>
  );
}

export default RecurringWiget;
