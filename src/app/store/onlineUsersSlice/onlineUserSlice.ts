import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "@/entities/user/types";

type IInitialState = string[];

const initialState: IInitialState = [];

const onlineUsersSlice = createSlice({
	name: "onlineUsers",
	initialState,
	reducers: {
		setOnlineUser: (
			state,
			action: PayloadAction<{ user: string | string[] }>
		) => {
			const { user } = action.payload;
			if (Array.isArray(user)) {
				const commonElements = user.filter((userr) => state.includes(userr));
				user.map((user) => {
					if (!commonElements.includes(user)) {
						state.push(user);
					}
				});
			}
			if (!Array.isArray(user) && !state.includes(user)) {
				state.push(user);
			}
		},
		eraseOnlineUser: (state, action: PayloadAction<{ user: string }>) => {
			const { user } = action.payload;
			let userToDelete = -2;
			state.map((userr, index) => {
				if (userr === user) {
					userToDelete = index;
				}
			});
			if (userToDelete !== -2) {
				state.splice(userToDelete, 1);
			}
		}
	}
});

export const { setOnlineUser, eraseOnlineUser } = onlineUsersSlice.actions;
export const onlineUsersSelector = (state: RootState) => state.onlineUser;
export default onlineUsersSlice.reducer;
