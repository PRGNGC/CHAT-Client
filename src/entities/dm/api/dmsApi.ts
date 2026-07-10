import { Socket } from "socket.io-client";
import { store } from "@/app/store/store";
import { editUser } from "@/app/store/userSlice/userSlice";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";

export async function getDms(page: number, search?: string) {
	const url = search
		? `http://localhost:3500/api/dms/get?page=${page}&search=${search}`
		: `http://localhost:3500/api/dms/get?page=${page}`;

	const response = await fetch(url, {
		method: "GET",
		credentials: "include"
	});

	return await response.json();
}

export function enterDm(socket: Socket) {
	const user = store.getState().user.user;

	socket.on("enter dm", ({ room, firstUser }) => {
		console.log("in second here");
		socket.emit("enter dm", {
			roomClient: room,
			secondUser: user,
			firstUser: firstUser
		});
	});
}

export function getNewDm(socket: Socket) {
	const dispatch = store.dispatch;

	socket.on("new dm", ({ newDm }) => {
		console.log("heer");
		console.log("socket.on ~ newDm:", newDm);
		dispatch(
			editUser({ fieldToEdit: "dms", newValue: newDm, operation: "add" })
		);

		dispatch(setActiveChat({ activeChat: newDm }));
	});
}
