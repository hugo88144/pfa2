import logo from "../../assets/images/logo-large.svg";
import houseLogo from "../../assets/images/icon-nav-overview.svg";
import transactionsLogo from "../../assets/images/icon-nav-transactions.svg";
import budgetLogo from "../../assets/images/icon-nav-budgets.svg";
import recurringLogo from "../../assets/images/icon-nav-recurring-bills.svg";
import potsLogo from "../../assets/images/icon-nav-pots.svg";
import NavBtn from "./navBtn";

function SideBar() {
  return (
    <div className="rounded-tr-3xl h-full flex flex-col p-12 gap-4 bg-gray-900 text-white max-1300:px-4 max-1100:flex-row  max-1100:p-[1rem] max-1100:h-auto max-500:text-transparent  ">
      {/* Logo Section */}
      <div className="mt-4 mb-28  max-1100:hidden">
        <img src={logo} alt="logo" />
      </div>

      {/* Navigation Links */}
      <NavBtn logo={houseLogo} to="Overview">
        Overview
      </NavBtn>

      <NavBtn logo={transactionsLogo} to="Transactions">
        Transactions
      </NavBtn>

      <NavBtn logo={budgetLogo} to="Budgets">
        Budgets
      </NavBtn>

      <NavBtn logo={potsLogo} to="Pots">
        Pots
      </NavBtn>

      <NavBtn logo={recurringLogo} to="RecurringBills">
        Recurring Bills
      </NavBtn>
    </div>
  );
}

export default SideBar;
