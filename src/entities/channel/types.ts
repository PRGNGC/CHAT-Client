import type { IMessage } from "../message/types";
import type { IUser } from "../user/types";

export interface IChannel {
	id: string;
	type: string;
	messages: IMessage[];
	name: string;
	participants: IUser[];
	availability: string;
	admin: string;
}
