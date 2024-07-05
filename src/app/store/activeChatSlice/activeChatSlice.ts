import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IChannel } from "@/entities/channel/types";
import type { IDm } from "@/entities/dm/types";
import { RootState } from "../store";
import { IMessage } from "@/entities/message/types";

interface IInitialState {
	activeChat: IChannel | IDm;
}

const initialState: IInitialState = { activeChat: {} as IChannel | IDm };

const activeChatSlice = createSlice({
	name: "activeSlice",
	initialState,
	reducers: {
		setActiveChat: (
			state,
			action: PayloadAction<{ activeChat: IChannel | IDm }>
		) => {
			const { activeChat } = action.payload;
			state.activeChat = activeChat;
		},
		eraseActiveChat: (state) => {
			state.activeChat = {} as IChannel | IDm;
		},
		updateActiveChat: (state, action: PayloadAction<{ message: IMessage }>) => {
			const { message } = action.payload;
			state.activeChat.messages.push(message);
		}
	}
});

export const { setActiveChat, eraseActiveChat, updateActiveChat } =
	activeChatSlice.actions;
export const activeChatSelector = (state: RootState) =>
	state.activeChat.activeChat;
export default activeChatSlice.reducer;
