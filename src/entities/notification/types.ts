import { IChannel } from "../channel/types";
import { IMessage } from "../message/types";
import { IUser } from "../user/types";

export interface INotification {
	type: string;
}

export interface IUnreadMessage extends INotification {
	room: string;
	count: number;
	firstUnreadMessage: IMessage;
}

export interface IInvitation extends INotification {
	room: string;
	inviter: IUser;
}

export interface IMention extends INotification {
	room: string;
	mentioner: IUser;
}

export interface IApplyRequest extends INotification {
	newUser: IUser;
	room: IChannel;
}

export interface IApplyResponse extends INotification {
	newUser: IUser;
	room: IChannel;
	permission: boolean;
}

export interface IChannelDeletion extends INotification {
	admin: IUser;
	room: IChannel;
}
