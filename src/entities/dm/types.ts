import type { IMessage } from "../message/types";
import type { IUser } from "../user/types";

export interface IDm {
	id: string;
	type: string;
	messages: IMessage[];
	firstUser: IUser;
	secondUser: IUser;
}
