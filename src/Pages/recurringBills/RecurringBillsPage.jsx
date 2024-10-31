import Header from "../../ui/Header";

import downArrow from "../../../assets/images/icon-caret-down.svg";

import TotalBills from "./TotalBills";
import RecTable from "./RecTable";
import { useSelector } from "react-redux";

import { useState } from "react";
import { getTransactions } from "../transactions/transactionSlice";
import { useMediaQuery } from "react-responsive";
import sort from "../../../assets/images/icon-sort-mobile.svg";
function RecurringBillsPage() {
  const data = useSelector(getTransactions);

  const RecurringData = [...data].filter((item) => item.recurring);

  const [searchTerm, setSearchTerm] = useState("");

  const [isdropdownOpen, setIsdropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Highest");

  const filteredTransactions = RecurringData.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDropdown = () => {
    setIsdropdownOpen(!isdropdownOpen);
  };

  const handleSortBy = (sortOption) => {
    setSortBy(sortOption); // Update the selected sort value

    setIsdropdownOpen(false); // Close the dropdown after selection
  };
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case "Highest":
        return a.amount - b.amount;

      case "Lowest":
        return b.amount - a.amount;
      case "A to Z":
        return a.name.localeCompare(b.name); // Sort by name A to Z
      case "Z to A":
        return b.name.localeCompare(a.name); // Sort by name Z to A

      default:
        return 0;
    }
  });
  const isScreenSmall = useMediaQuery({ maxWidth: 600 });
  console.log(isScreenSmall);

  return (
    <div className="w-full flex flex-col px-28 pt-28 gap-12 overflow-auto max-700:px-10 max-700:pt-14">
      <Header title="Recurring Bills" />

      <div className="flex gap-10 max-900:flex-col">
        <TotalBills />

        <div className="flex bg-white rounded-xl w-full  h-full  p-14 flex-col">
          <div className="flex pb-10 justify-between  max-500:pb-2 ">
            <div className="flex h-full">
              <input
                type="text"
                placeholder="Search transactions"
                className="border-gray-500 border-[1px] pr-72 pl-6 py-4 rounded-xl text-2xl max-1300:pr-0"
                onChange={(e) => handleSearchChange(e)}
              />
            </div>
            <div className="flex gap-6  h-full items-center">
              <p
                type="dropdown"
                className="text-2xl text-gray-600 max-600:hidden  h-full"
              >
                sort by
              </p>
              <div className="h-full relative space-y-3 text-2xl ">
                {isScreenSmall && (
                  <button onClick={() => handleDropdown()}>
                    <img src={sort} alt="sort icon" />
                  </button>
                )}
                <button
                  onClick={() => handleDropdown()}
                  className="border-gray-500 border-[1px] px-6 rounded-xl h-[4.2rem] flex items-center gap-24  justify-between font-semibold max-600:hidden "
                >
                  {sortBy}
                  <img src={downArrow} alt="" />
                </button>
                {isdropdownOpen && (
                  <div className="absolute w-full bg-white rounded-xl   z-10 border-gray-500 border-[1px] max-600:w-[15rem] max-600:right-0">
                    <div
                      onClick={() => handleSortBy("A to Z")}
                      className="hover:bg-gray-200 pl-6 py-4"
                      value="A to Z"
                    >
                      A to Z
                    </div>
                    <div
                      onClick={() => handleSortBy("Z to A")}
                      className="hover:bg-gray-200 pl-6 py-4"
                      value="Z to A"
                    >
                      Z to A
                    </div>
                    <div
                      onClick={() => handleSortBy("Highest")}
                      className="hover:bg-gray-200 pl-6 py-4"
                      value="Highest"
                    >
                      Highest
                    </div>
                    <div
                      onClick={() => handleSortBy("Lowest")}
                      className="hover:bg-gray-200 pl-6 py-4"
                      value="Lowest"
                    >
                      Lowest
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <RecTable data={sortedTransactions} perPage={8} />
        </div>
      </div>
    </div>
  );
}

export default RecurringBillsPage;
