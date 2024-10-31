import {
  createSelector,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Async thunk for fetching pots from the API
export const fetchPots = createAsyncThunk("pots/fetchPots", async () => {
  const response = await fetch("http://127.0.0.1:9000/api/pots");
  if (!response.ok) {
    throw new Error("Failed to fetch pots");
  }
  return response.json(); // Return the pots data
});

// Async thunk for adding a new pot
export const addPot = createAsyncThunk("pots/addPot", async (newPot) => {
  const response = await fetch("http://127.0.0.1:9000/api/pots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newPot),
  });

  if (!response.ok) {
    throw new Error("Failed to add pot");
  }

  return response.json(); // Return the added pot data
});

// Async thunk for updating a pot
export const updatePot = createAsyncThunk(
  "pots/updatePot",
  async (updatedPot) => {
    const response = await fetch(
      `http://127.0.0.1:9000/api/pots/${updatedPot.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedPot),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update pot");
    }

    return response.json(); // Return the updated pot data
  }
);

// Create the pots slice
const potSlice = createSlice({
  name: "pots",
  initialState: {
    pots: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    //   increasePot(state, action) {
    //     const { id, amount } = action.payload;
    //     const pot = state.pots.find((pot) => pot.id === id);
    //     if (pot) {
    //       pot.total += amount;
    //     }
    //   },
    //   decreasePot(state, action) {
    //     const { id, amount } = action.payload;
    //     const pot = state.pots.find((pot) => pot.id === id);
    //     if (pot) {
    //       pot.total -= amount;
    //     }
    //   },
    //   deletePot(state, action) {
    //     const { id } = action.payload;
    //     return { ...state, pots: state.pots.filter((pot) => pot.id !== id) };
    //   },
    setPots(state, action) {
      state.pots = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPots.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPots.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pots = action.payload; // Add the pots to the state
      })
      .addCase(fetchPots.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPot.fulfilled, (state, action) => {
        state.pots.push(action.payload); // Add the new pot to the state
      })
      .addCase(updatePot.fulfilled, (state, action) => {
        const index = state.pots.findIndex(
          (pot) => pot.id === action.payload.id
        );
        if (index !== -1) {
          state.pots[index] = action.payload; // Update the pot in the state
        }
      });
  },
});

// Export the reducer to be used in the store
export const { increasePot, setPots, decreasePot, deletePot } =
  potSlice.actions;

export const getPotsData = (state) => state.pots.pots;

export const getPotTotal = createSelector([getPotsData], (pots) =>
  pots.reduce((total, pot) => total + pot.total, 0)
);

export const selectPotsStatus = (state) => state.pots.status;
export const selectPotsError = (state) => state.pots.error;

export default potSlice.reducer;
