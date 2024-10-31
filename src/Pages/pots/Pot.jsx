import { useSelector } from "react-redux";
import { getPotsData } from "../pots/potSlice";

function Pot() {
  const data = useSelector(getPotsData);

  return (
    data &&
    data
      .map((item, index) => (
        <div key={index} className=" w-full flex ">
          <span
            className={`h-full w-2 rounded-xl mr-6 `}
            style={{ backgroundColor: item.theme }} // Apply dynamic hex color here
          ></span>
          <div>
            <p className="text-gray-400 text-xl">{item.name}</p>
            <p className="text-3xl font-bold">${item.total}</p>
          </div>
        </div>
      ))
      .slice(0, 4)
  );
}

export default Pot;
