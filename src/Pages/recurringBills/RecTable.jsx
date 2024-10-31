/* eslint-disable react/prop-types */
import { formatCurrency, formatDay } from "../../utils/helpers";
import iconCaretLeft from "../../../assets/images/icon-caret-left.svg";
import iconCaretRight from "../../../assets/images/icon-caret-right.svg";
import { useState } from "react";

function RecTable({ data, perPage }) {
  const today = new Date();
  const day = today.getDate();

  ////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / perPage);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  function handleNextPage() {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  }

  function handlePrevPage() {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  }

  function handlePageClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <table className="w-full ">
        <thead className="">
          <tr>
            <th className="text-2xl font-normal text-gray-500 text-left p-6 max-500:text-xl">
              Bill Title
            </th>
            <th className="text-2xl font-normal text-gray-500 text-left max-600:hidden">
              Category
            </th>
            <th className="text-2xl font-normal text-gray-500 text-left max-500:text-xl">
              due date
            </th>
            <th className="text-2xl font-normal text-gray-500 text-right max-500:text-xl">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.slice(start, end).map((item, index) => {
              const itemDate = new Date(item.date);
              const billDay = itemDate.getDate();
              let statusColor = "gray"; // Default is gray (due but not soon)

              if (billDay <= day) {
                statusColor = "green"; // Past due or today
              } else if (billDay > day && billDay <= day + 7) {
                statusColor = "red"; // Due soon
              }

              return (
                <tr key={index} className="border-t">
                  <td className="text-2xl font-normal flex items-center p-6">
                    <img
                      className="w-14 rounded-full"
                      src={item.avatar}
                      alt="icon"
                    />
                    <p className="pl-4 font-bold">{item.name}</p>
                  </td>
                  <td className="text-2xl font-normal text-gray-500 max-600:hidden">
                    {item.category}
                  </td>
                  <td
                    style={{ color: statusColor }} // Set the color dynamically
                    className="text-2xl font-normal"
                  >
                    Monthly-{formatDay(item.date)}
                  </td>
                  <td className="text-2xl font-bold text-right">
                    {formatCurrency(item.amount).slice(1)}{" "}
                    {/* Assuming currency symbol is sliced off */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="flex justify-between mt-14 items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="border-gray-500 border-[1px] py-4  px-6 rounded-xl h-full flex items-center gap-6 text-2xl"
        >
          <img src={iconCaretLeft} alt="" />
          Prev
        </button>
        <div className="flex justify-center items-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              style={{
                backgroundColor: currentPage === index + 1 ? "black" : "white",
                color: currentPage === index + 1 ? "white" : "black",
              }}
              className="border-gray-500 border-[1px] py-3 px-5 rounded-xl h-[80%] mx-2 text-2xl flex items-center"
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="border-gray-500 border-[1px] py-4 px-6 rounded-xl h-full flex items-center gap-6 text-2xl"
        >
          Next
          <img src={iconCaretRight} alt="" />
        </button>
      </div>
    </div>
  );
}

export default RecTable;
