// import { newChannel } from "@/entities/channel/api/channelsApi";
import { Socket } from "socket.io-client";
import { store } from "@/app/store/store";
import { useQueryClient } from "@tanstack/react-query";
import { editUser } from "@/app/store/userSlice/userSlice";
import { IChannel } from "../types";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import {
	addApplyResponseNotification,
	addChannelDeletionNotification
} from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { IUser } from "@/entities/user/types";
import { addApplyRequestNotification } from "@/app/store/messageNotificationSlice/messageNotificationSlice";

export async function getChannels(page: number, search?: string) {
	const url = search
		? `http://localhost:3500/api/channels/get?page=${page}&search=${search}`
		: `http://localhost:3500/api/channels/get?page=${page}`;

	const response = await fetch(url, {
		method: "GET",
		credentials: "include"
	});

	return await response.json();
}

export function enterChannel(socket: Socket, newChannelId: string) {
	const user = store.getState().user.user;

	// socket.emit("new channel", {
	// 	name: name,
	// 	accessability: accessability,
	// 	description: description,
	// 	admin: user
	// });

	socket.emit("enter channel", {
		room: newChannelId,
		user: user
	});
}

export function newChannel(
	socket: Socket,
	name: string,
	accessability: string,
	description: string
) {
	const user = store.getState().user.user;

	socket.emit("new channel", {
		name: name,
		accessability: accessability,
		description: description,
		admin: user
	});
}

export function getNewChannel(socket: Socket) {
	socket.on("new channel", ({ admin, newChannel }) => {
		const user = store.getState().user.user;
		const dispatch = store.dispatch;

		if (admin.userId === user.userId) {
			dispatch(
				editUser({
					fieldToEdit: "channels",
					newValue: newChannel,
					operation: "add"
				})
			);
		}

		const queryClient = useQueryClient();
		queryClient.invalidateQueries({ queryKey: ["channels"] });
	});
}

export function deleteChannelRequest(socket: Socket, channel: IChannel) {
	socket.emit("delete channel", { channel });
}

export function deleteChannelResponse(socket: Socket) {
	const user = store.getState().user.user;
	const channels = store.getState().user.user.channels;
	// const activeChat = store.getState().activeChat.activeChat;
	const dispatch = store.dispatch;

	socket.on("delete channel", ({ admin, channel }) => {
		const activeChat = store.getState().activeChat.activeChat;
		dispatch(
			editUser({
				fieldToEdit: "channels",
				newValue: channel,
				operation: "delete"
			})
		);

		if (user.userId !== admin.userId) {
			dispatch(
				addChannelDeletionNotification({ admin: admin, channel: channel })
			);
		}
		// dispatch(setActiveChat({ activeChat: channels[0] }));

		if (channel.id === activeChat.id) {
			// dispatch(setActiveChat({ activeChat: channels[0] }));

			// специальный синтаксис для не установления активного чата
			dispatch(setActiveChat({ activeChat: {} as IChannel }));
		}
	});
}

export function applyEnter(socket: Socket, user: IUser, channel: IChannel) {
	socket.emit("apply enter", { user, channel });
}

export function getApplyEnterRequest(socket: Socket) {
	const dispatch = store.dispatch;

	socket.on("apply enter", ({ user, channel }) => {
		dispatch(addApplyRequestNotification({ user: user, room: channel }));
	});
}

export function approveApplyEnter(
	socket: Socket,
	user: IUser,
	channel: IChannel
) {
	socket.emit("apply response", { user, channel, permission: true });
	// socket.emit("enter channel", {
	// 	room: channel,
	// 	user: user
	// });
}

export function denyApplyEnter(socket: Socket, user: IUser, channel: IChannel) {
	socket.emit("apply response", { user, channel, permission: false });
	// добавить сюда clearNotification
}

export function getApplyEnterResponse(socket: Socket) {
	const dispatch = store.dispatch;

	socket.on("apply response", ({ user, channel, permission }) => {
		console.log("socket.on ~ channel:", channel);
		dispatch(addApplyResponseNotification({ room: channel, user, permission }));

		if (permission) {
			socket.emit("enter_channel", {
				room: channel.id,
				user: user
			});

			dispatch(
				editUser({
					fieldToEdit: "channels",
					newValue: channel,
					operation: "add"
				})
			);
		}
	});
}
