import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IInitialState {
	accessToken: string;
}

const initialState: IInitialState = {
	accessToken: ""
};

const sessionSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
			const { accessToken } = action.payload;
			state.accessToken = accessToken;
		},
		eraseAccessToken: (state) => {
			state.accessToken = "";
		}
	}
});

export const { setAccessToken, eraseAccessToken } = sessionSlice.actions;
export const sessionSelector = (state: RootState) => state.session.accessToken;
export default sessionSlice.reducer;
