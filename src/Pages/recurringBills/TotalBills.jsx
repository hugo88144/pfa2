import { useDispatch, useSelector } from "react-redux";
import BillsIcon from "../../../assets/images/icon-recurring-bills.svg";
import { formatCurrency } from "../../utils/helpers";
import { getReData, setRecurringData } from "./recurringSlice";
import { useEffect } from "react";
import { getRecurringTransactions } from "../transactions/transactionSlice";
import { computeBillTotals } from "../../utils/computeBills";

function TotalBills() {
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

  const { paidBills, totalUpcoming, dueSoon, paid, total, due } =
    useSelector(getReData);

  return (
    <div className="w-[35%] space-y-10 max-900:w-full max-900:flex  max-900:space-y-0  max-900:space-x-8 ">
      <div className="bg-black w-full text-white rounded-xl p-10 space-y-12">
        <img src={BillsIcon} alt="BillsIcon" className="w-16" />
        <p className="text-3xl font-semibold">Total Bills</p>
        <p className="text-6xl font-bold">
          {formatCurrency(paidBills + totalUpcoming + dueSoon).slice(1)}
        </p>
      </div>

      <div className="bg-white p-6 max-900:w-full ">
        <h4 className="text-3xl font-semibold p-4">Summary</h4>
        <div className="flex justify-between p-4 border-t-[1px]">
          <div className="text-xl text-gray-600">Paid Bills</div>
          <div className="text-xl text-gray-900 font-bold">{`${paid} (${formatCurrency(
            paidBills
          ).slice(1)})`}</div>
        </div>
        <div className="flex justify-between p-4 border-t-[1px]">
          <div className="text-xl text-gray-600">Total Upcoming</div>
          <div className="text-xl text-gray-900 font-bold">{`${total} (${formatCurrency(
            totalUpcoming
          ).slice(1)})`}</div>
        </div>
        <div className="flex justify-between p-4 border-t-[1px]">
          <div className="text-xl text-gray-600">Due Soon</div>
          <div className="text-xl text-gray-900 font-bold">{`${due} (${formatCurrency(
            dueSoon
          ).slice(1)})`}</div>
        </div>
      </div>
    </div>
  );
}

export default TotalBills;
