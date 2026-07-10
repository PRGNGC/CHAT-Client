import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IInitialState {
	userInfoStatus: boolean;
	chatInfoStatus: boolean;
	showChat: boolean;
}

const initialState: IInitialState = {
	userInfoStatus: false,
	chatInfoStatus: false,
	showChat: true
};

const togglersSlice = createSlice({
	name: "togglersSlice",
	initialState,
	reducers: {
		toggleUserInfoStatus: (state) => {
			state.userInfoStatus = !state.userInfoStatus;
		},
		toggleChatInfoStatus: (state) => {
			state.chatInfoStatus = !state.chatInfoStatus;
		},
		toggleShowChat: (
			state
			// action: PayloadAction<{ status: boolean } | undefined>
		) => {
			// let status: boolean | undefined;
			// if (action) {
			// status = action.payload?.status;
			// }

			// if (status) {
			// state.showChat = status;
			// } else {
			state.showChat = !state.showChat;
			// }
		}

		// addTypingUser: (state, action: PayloadAction<{ userName: string }>) => {
		// 	const { userName } = action.payload;
		// 	state.push(userName);
		// },
		// eraseTypingUser: (state, action: PayloadAction<{ userName: string }>) => {
		// 	const { userName } = action.payload;
		// 	const userIndex = state.indexOf(userName);
		// 	state.splice(userIndex, 1);
		// }
	}
});

export const { toggleUserInfoStatus, toggleChatInfoStatus, toggleShowChat } =
	togglersSlice.actions;
export const togglersSelector = (state: RootState) => state.togglers;
export default togglersSlice.reducer;
