import type { ISocketMessage } from "@/entities/message/types";
import { updateActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { addUnreadMessageNotification } from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { Socket } from "socket.io-client";
import { store } from "@/app/store/store";
import { addTypingUser } from "@/app/store/usersTyping/usersTyping";
import { eraseTypingUser } from "@/app/store/usersTyping/usersTyping";
import { updateChannel, updateDm } from "@/app/store/userSlice/userSlice";

export function receiveMessageStatus(socket: Socket) {
	const dispatch = store.dispatch;
	const activeChat = store.getState().activeChat.activeChat;

	socket.on("typing", ({ status, user, room }) => {
		if (status === true && activeChat.id === room) {
			dispatch(addTypingUser({ userName: user }));
		}
		if (status === false && activeChat.id === room) {
			dispatch(eraseTypingUser({ userName: user }));
		}
	});
}

export function sendActiveMessageStatus(socket: Socket) {
	const activeChat = store.getState().activeChat.activeChat;
	const user = store.getState().user.user;

	socket.emit("typing", {
		status: true,
		room: activeChat.id,
		user: user.name
	});
}

export function sendIdleMessageStatus(socket: Socket) {
	const activeChat = store.getState().activeChat.activeChat;
	const user = store.getState().user.user;

	socket.emit("typing", {
		status: false,
		room: activeChat.id,
		user: user.name
	});
}

export function sendMessage(
	socket: Socket,
	message: string,
	files?: File[] | null
) {
	const activeChat = store.getState().activeChat.activeChat;
	const user = store.getState().user.user;

	const messageObj =
		files === null
			? {
					userName: user.name,
					content: message,
					userImg: user.userImg,
					userId: user.userId,
					type: "usual"
				}
			: {
					userName: user.name,
					content: message,
					userImg: user.userImg,
					userId: user.userId,
					type: "usual",
					filesInfo: files?.map((file) => {
						return {
							name: file.name.split(".")[0],
							extension: file.name.split(".")[1],
							type: file.type,
							file: file
						};
					})
				};

	socket.emit("message", {
		messageOrigin: activeChat.id,
		message: messageObj,
		room: activeChat.id,
		type: activeChat.type
	});
}

export function receiveMessage(socket: Socket) {
	const dispatch = store.dispatch;
	const activeChat = store.getState().activeChat.activeChat;

	socket.on("message", ({ message, messageOrigin }: ISocketMessage) => {
		if (activeChat.id === messageOrigin) {
			dispatch(updateActiveChat({ message }));
		}

		if (activeChat.id !== messageOrigin) {
			dispatch(
				addUnreadMessageNotification({ room: messageOrigin, message: message })
			);
		}

		if (activeChat.type === "channel") {
			dispatch(
				updateChannel({ channelId: messageOrigin, newMessage: message })
			);
		}

		if (activeChat.type === "dm") {
			dispatch(updateDm({ dmId: messageOrigin, newMessage: message }));
		}
	});
}

export async function downloadFile(filename: string) {
	const response = await fetch(
		`http://localhost:3500/api/file/download?filename=${filename}`,
		{
			method: "GET",
			credentials: "include"
		}
	);

	return await response.json();
}
