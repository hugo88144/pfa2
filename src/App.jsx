import OverviewPage from "./Pages/overview/OverviewPage";
import PotsPage from "./Pages/pots/potsPage";
import RecurringBillsPage from "./Pages/recurringBills/recurringBillsPage";
import TransactionsPage from "./Pages/transactions/transactionsPage";
import BudgetsPage from "./Pages/budgets/BudgetsPage";
import LoginPage from "./Pages/login/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import SignUp from "./Pages/login/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "Overview",
        element: <OverviewPage />,
      },
      {
        path: "Transactions",
        element: <TransactionsPage />,
      },
      {
        path: "Budgets",
        element: <BudgetsPage />,
      },
      {
        path: "Pots",
        element: <PotsPage />,
      },
      {
        path: "RecurringBills",
        element: <RecurringBillsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
