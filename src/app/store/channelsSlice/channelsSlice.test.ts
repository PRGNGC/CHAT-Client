import { store } from "../store";
import { setChannels, updateRoom } from "./channelsSlice";
import { eraseChannels } from "./channelsSlice";
import { addChannel } from "./channelsSlice";
import { deleteChannel } from "./channelsSlice";

describe("testing channels slice", () => {
	it("should check channelsSlice default value", () => {
		const channelsState = store.getState().channels.channels;
		expect(channelsState).toHaveLength(0);
	});
	it("should test setChannels action", () => {
		const channels = [
			{
				id: "1",
				type: "channel",
				participants: [],
				name: "development",
				messages: [],
				availability: "private",
				admin: "user"
			},
			{
				id: "1",
				type: "channel",
				messages: [],
				name: "development",
				participants: [],
				availability: "private",
				admin: "user2"
			}
		];

		store.dispatch(setChannels({ channels: channels }));

		const channelsState = store.getState().channels.channels;

		expect(channelsState).toHaveLength(2);
	});
	it("should test eraseChannels action", () => {
		const channels = [
			{
				id: "1",
				type: "channel",
				participants: [],
				name: "development",
				messages: [],
				availability: "private",
				admin: "user"
			},
			{
				id: "1",
				type: "channel",
				messages: [],
				name: "development",
				participants: [],
				availability: "private",
				admin: "user2"
			}
		];

		store.dispatch(setChannels({ channels: channels }));

		const channelsState = store.getState().channels.channels;

		expect(channelsState).toHaveLength(2);

		store.dispatch(eraseChannels());

		const clearedChannelsState = store.getState().channels.channels;

		expect(clearedChannelsState).toHaveLength(0);
	});
	it("should add 1 new channel", () => {
		const channel = {
			id: "1",
			type: "channel",
			participants: [],
			name: "development",
			messages: [],
			availability: "private",
			admin: "user"
		};
		store.dispatch(addChannel({ newChannel: channel }));

		const channelsState = store.getState().channels.channels;

		expect(channelsState).toHaveLength(1);
	});
	it("should delete 1 new channel", () => {
		const channel = {
			id: "1",
			type: "channel",
			participants: [],
			name: "development",
			messages: [],
			availability: "private",
			admin: "user"
		};

		store.dispatch(deleteChannel({ deleteChannel: channel }));

		const clearedChannelsState = store.getState().channels.channels;

		expect(clearedChannelsState).toHaveLength(0);
	});
	it("should update channel info", () => {
		const channel = {
			id: "1",
			type: "channel",
			participants: [],
			name: "development",
			messages: [],
			availability: "private",
			admin: "user"
		};
		store.dispatch(addChannel({ newChannel: channel }));

		const channelsState = store.getState().channels.channels;

		expect(channelsState).toHaveLength(1);
		expect(channelsState[0].messages).toHaveLength(0);

		const message = {
			content: "new content",
			userName: "Jake",
			userImg: "img",
			userId: "2",
			filesInfo: [],
			type: "common"
		};

		store.dispatch(updateRoom({ activeChat: "1", newMessage: message }));

		const alteredChannel = store.getState().channels.channels;

		expect(alteredChannel[0].messages).toHaveLength(1);
		expect(alteredChannel[0].messages).toHaveLength(1);
		expect(alteredChannel[0].messages[0].content).toContain("new content");
	});
});
