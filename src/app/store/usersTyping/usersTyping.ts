import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type IInitialState = string[];

const initialState: IInitialState = [];

const usersTyping = createSlice({
	name: "usersTyping",
	initialState,
	reducers: {
		addTypingUser: (state, action: PayloadAction<{ userName: string }>) => {
			const { userName } = action.payload;
			state.push(userName);
		},
		eraseTypingUser: (state, action: PayloadAction<{ userName: string }>) => {
			const { userName } = action.payload;
			const userIndex = state.indexOf(userName);
			state.splice(userIndex, 1);
		}
	}
});

export const { addTypingUser, eraseTypingUser } = usersTyping.actions;
export const usersTypingSelector = (state: RootState) => state.typing;
export default usersTyping.reducer;
