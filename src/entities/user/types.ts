import type { IDm } from "../dm/types";
import type { IChannel } from "../channel/types";

export interface IUser {
	name: string;
	userId: string;
	userImg: string;
	status: string;
	dms: IDm[];
	channels: IChannel[];
}
