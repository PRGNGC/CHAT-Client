import { IChannel } from "@/entities/channel/types";
import { IUser } from "@/entities/user/types";
import { Socket } from "socket.io-client";

export function clearNotification(
	socket: Socket,
	user: IUser,
	type: string,
	room: string | IChannel
): void {
	// const socket = useSocketContext();
	socket.emit("clear notification", { user, type, room });
}
