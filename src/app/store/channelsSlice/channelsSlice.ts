import {
	createSelector,
	createSlice,
	current,
	PayloadAction
} from "@reduxjs/toolkit";
import type { IChannel } from "@/entities/channel/types";
import { RootState } from "../store";
import { IMessage } from "@/entities/message/types";

interface initialState {
	channels: IChannel[];
}

const initialState = { channels: [] as IChannel[] };

const channelsSlice = createSlice({
	name: "channels",
	initialState,
	reducers: {
		setChannels: (state, action: PayloadAction<{ channels: IChannel[] }>) => {
			const { channels } = action.payload;
			state.channels = channels;
		},
		eraseChannels: (state) => {
			state.channels = [];
		},
		addChannel: (state, action: PayloadAction<{ newChannel: IChannel }>) => {
			const { newChannel } = action.payload;
			state.channels.push(newChannel);
		},
		deleteChannel: (
			state,
			action: PayloadAction<{ deleteChannel: IChannel }>
		) => {
			const { deleteChannel } = action.payload;
			let channelIndex = -2;
			state.channels.filter((channel, index) => {
				if (deleteChannel.id === channel.id) {
					channelIndex = index;
				}
			});
			if (channelIndex !== -2) {
				state.channels.splice(channelIndex, 1);
			}
		},
		updateRoom: (
			state,
			action: PayloadAction<{ activeChat: string; newMessage: IMessage }>
		) => {
			const { activeChat, newMessage } = action.payload;
			let roomIndex = -2;
			current(state).channels.find((room: IChannel, index: number) => {
				if (room.id === activeChat) {
					roomIndex = index;
					return room;
				}
			});

			if (roomIndex !== -2) {
				(state.channels[roomIndex] as IChannel).messages.push(newMessage);
			}
		}
	}
});

export const {
	setChannels,
	eraseChannels,
	updateRoom,
	addChannel,
	deleteChannel
} = channelsSlice.actions;
export const channelsSelector = (state: RootState) => state.channels.channels;

export default channelsSlice.reducer;
