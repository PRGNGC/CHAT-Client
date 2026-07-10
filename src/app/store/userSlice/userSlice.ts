import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { IUser } from "@/entities/user/types";
import { RootState } from "../store";
import { IMessage } from "@/entities/message/types";

const initialState = {
	user: {} as IUser
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		loginUser: (state, action: PayloadAction<{ user: IUser }>) => {
			const { user } = action.payload;
			state.user = user;
		},
		signupUser: (state, action: PayloadAction<{ user: IUser }>) => {
			const { user } = action.payload;
			state.user = user;
		},
		updateChannel: (
			state,
			action: PayloadAction<{ channelId: string; newMessage: IMessage }>
		) => {
			const { channelId, newMessage } = action.payload;

			let channelIndex = -2;
			state.user.channels.find((room, index: number) => {
				if (room.id === channelId) {
					channelIndex = index;
					return room;
				}
			});

			if (channelIndex !== -2) {
				state.user.channels[channelIndex].messages.push(newMessage);
			}
		},
		updateDm: (
			state,
			action: PayloadAction<{ dmId: string; newMessage: IMessage }>
		) => {
			const { dmId, newMessage } = action.payload;

			let dmIndex = -2;
			state.user.dms.find((room, index: number) => {
				if (room.id === dmId) {
					dmIndex = index;
					return room;
				}
			});

			if (dmIndex !== -2) {
				state.user.dms[dmIndex].messages.push(newMessage);
			}
		},
		logoutUser: (state) => {
			state.user = {} as IUser;
		},
		editUser: (
			state,
			action: PayloadAction<{
				fieldToEdit: string;
				newValue: any;
				operation: string;
			}>
		) => {
			const { fieldToEdit, newValue, operation } = action.payload;

			if (fieldToEdit === "channels" && operation === "add") {
				state.user.channels.push(newValue);
			}
			if (fieldToEdit === "channels" && operation === "delete") {
				const channelIndex = state.user.channels.findIndex(
					(channel) => channel.id === newValue.id
				);
				state.user.channels.splice(channelIndex, 1);
			}
			if (fieldToEdit === "dms" && operation === "add") {
				state.user.dms.push(newValue);
			}
		}
	}
});

export const {
	loginUser,
	logoutUser,
	signupUser,
	updateDm,
	updateChannel,
	editUser
} = userSlice.actions;
export const userSelector = (state: RootState) => state.user.user;
export const channelSelector = (state: RootState) => state.user.user.channels;
export const dmSelector = (state: RootState) => state.user.user.dms;
export default userSlice.reducer;
