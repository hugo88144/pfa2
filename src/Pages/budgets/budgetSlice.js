import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getTransactions } from "../transactions/transactionSlice"; // Import the transactions selector

export const addBudget = createAsyncThunk(
  "budget/addPot",
  async (newBudget) => {
    console.log(newBudget);

    const response = await fetch("http://127.0.0.1:9000/api/budgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newBudget),
    });

    if (!response.ok) {
      throw new Error("Failed to add pot");
    }

    return response.json(); // Return the added pot data
  }
);

// export const updateBudget = createAsyncThunk(

//   "budget/updateBudget",
//   async (updatedBudget) => {
//     console.log(updatedBudget);
//     const response = await fetch(
//       `http://127.0.0.1:9000/api/budgets/${updatedBudget.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(updatedBudget),
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Failed to update pot");
//     }

//     return response.json(); // Return the updated pot data
//   }
// );
export const updateBudget = createAsyncThunk(
  "budget/updateBudget",
  async (updatedBudget) => {
    console.log("Updating Budget:", updatedBudget);
    const response = await fetch(
      `http://127.0.0.1:9000/api/budgets/${updatedBudget.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedBudget),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update budget"); // Better error message
    }

    return response.json(); // Return the updated budget data
  }
);

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budget: [],
  },
  reducers: {
    setBudget(state, action) {
      state.budget = action.payload;
    },
    addBudget(state, action) {
      state.budget = [...state.budget, action.payload];
    },

    deleteBudget(state, action) {
      const { id } = action.payload;

      state.budget = state.budget.filter((budget) => budget.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBudget.fulfilled, (state, action) => {
      state.budget = [...state.budget, action.payload];
    });

    builder.addCase(updateBudget.fulfilled, (state, action) => {
      const index = state.budget.findIndex(
        (budget) => budget.id === action.payload.id
      );
      if (index !== -1) {
        state.budget[index] = action.payload;
      }
    });
  },
});

// Selector to get budgets
const selectBudgets = (state) => state.budget.budget || [];

// Memoized selector to calculate spent amounts for each budget item based on transactions from the transactionSlice
export const getBudgetData = createSelector(
  [selectBudgets, getTransactions], // Use the getTransactions selector from the transactionSlice
  (budgets, transactions) => {
    return budgets.map((budgetItem) => {
      const updatedBudget = { ...budgetItem, spent: 0 };

      // Calculate total spent for the current budget
      transactions.forEach((transactionItem) => {
        if (transactionItem.category === updatedBudget.category) {
          updatedBudget.spent += Math.abs(transactionItem.amount);
        }
      });

      return updatedBudget;
    });
  }
);

// Selector to calculate the total maximum budget
export const getBudgetTotal = createSelector([getBudgetData], (budgetData) => {
  return budgetData.reduce((total, item) => total + Number(item.maximum), 0);
});

// Selector to calculate the total spent budget
export const getBudgetSpent = createSelector([getBudgetData], (budgetData) => {
  return budgetData.reduce((total, item) => total + item.spent, 0);
});

// Export the reducer actions
export const { setBudget, addBuget, deleteBudget } = budgetSlice.actions;

// Export the budget reducer as default
export default budgetSlice.reducer;
