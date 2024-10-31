import iconPot from "../../../assets/images/icon-pot.svg";
import { useSelector } from "react-redux";

import Pot from "../pots/Pot";
import SubTitle from "../../ui/SubTitle";
import { getPotsData } from "../pots/potSlice";

function PotWiget() {
  const total = useSelector(getPotsData).reduce(
    (total, item) => total + item.total,
    0
  );

  return (
    <div className="flex bg-white rounded-xl  w-full flex-col p-8 ">
      <SubTitle to="/pots">Pots</SubTitle>

      <div className="flex  gap-5 ">
        <div className="flex gap-6 bg-  bg-[#F8F4F0] w-[85%] rounded-xl p-8">
          <img src={iconPot} alt="money jar icon" className="w-14" />
          <div className="space-y-4">
            <div className="text-gray-400">Total Saved</div>
            <div className="text-6xl font-bold max-1300:text-4xl">${total}</div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gird-rows-2 gap-4">
          <Pot />
        </div>
      </div>
    </div>
  );
}

export default PotWiget;
