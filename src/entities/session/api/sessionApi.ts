import { Socket } from "socket.io-client";
import { store } from "@/app/store/store";
import { setOnlineUser } from "@/app/store/onlineUsersSlice/onlineUserSlice";
import { eraseOnlineUser } from "@/app/store/onlineUsersSlice/onlineUserSlice";

export async function loginApi(login: string, password: string) {
	const response = await fetch("http://localhost:3500/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			login: login,
			password: password
		}),
		credentials: "include"
	});

	return { payload: await response.json(), status: response.status };
}

export async function signupApi(
	login: string,
	password: string,
	status: string,
	name: string,
	img: File
) {
	const formData = new FormData();
	formData.append("login", login);
	formData.append("password", password);
	formData.append("status", status);
	formData.append("name", name);
	formData.append("img", img);

	const response = await fetch("http://localhost:3500/api/auth/signup", {
		method: "POST",
		body: formData,
		credentials: "include"
	});

	return { payload: await response.json(), status: response.status };
}

export async function logoutApi() {
	const response = await fetch("http://localhost:3500/api/auth/logout", {
		method: "POST",
		credentials: "include"
	});

	return response.status;
}

export function connectToRooms(socket: Socket) {
	const user = store.getState().user.user;
	const channelsRooms = user.channels.map((channel) => channel.id);
	const dmsRooms = user.dms.map((dms) => dms.id);

	socket.emit("join rooms", {
		rooms: channelsRooms.concat(dmsRooms),
		user: user.userId
	});
}

export function getConnectionStatuses(socket: Socket) {
	const dispatch = store.dispatch;

	socket.on("online", ({ status, user }) => {
		if (status === true) {
			dispatch(setOnlineUser({ user: user }));
		}
		if (status === false) {
			dispatch(eraseOnlineUser({ user: user }));
		}
	});
}
