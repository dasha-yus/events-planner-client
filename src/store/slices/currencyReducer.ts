import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CurrencyISO } from "../../utils/constants";

export interface CurrencyState {
  value: string;
}

const initialState: CurrencyState = {
  value: CurrencyISO.USD,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    switchCurrency: (state, action: PayloadAction<CurrencyISO>) => {
      state.value = action.payload;
    },
  },
});

export const { switchCurrency } = currencySlice.actions;

export default currencySlice.reducer;
