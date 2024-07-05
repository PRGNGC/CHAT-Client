import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { useSelector } from "react-redux";
import { activeChatSelector } from "../activeChatSlice/activeChatSlice";
import {
	IApplyRequest,
	IApplyResponse,
	IChannelDeletion,
	IInvitation,
	IMention,
	IUnreadMessage
} from "@/entities/notification/types";
import { IMessage } from "@/entities/message/types";
import { IUser } from "@/entities/user/types";
import { IChannel } from "@/entities/channel/types";

interface IInitialState {
	unreadMessages: IUnreadMessage[];
	invitations: IInvitation[];
	mentions: IMention[];
	applyRequests: IApplyRequest[];
	channelDeletion: IChannelDeletion[];
	applyResponses: IApplyResponse[];
}

const initialState: IInitialState = {
	unreadMessages: [],
	invitations: [],
	mentions: [],
	applyRequests: [],
	channelDeletion: [],
	applyResponses: []
};

const messagesNotification = createSlice({
	name: "messageNotification",
	initialState,
	reducers: {
		addUnreadMessageNotification: (
			state,
			action: PayloadAction<{ room: string; message: IMessage }>
		) => {
			const { room, message } = action.payload;

			let roomOfUnreadMessage = -2;
			state.unreadMessages.map((unreadMessage, index) => {
				if (unreadMessage.room === room) {
					roomOfUnreadMessage = index;
				}
			});

			if (roomOfUnreadMessage === -2) {
				state.unreadMessages.push({
					type: "unreadMessage",
					room: room,
					count: 1,
					firstUnreadMessage: message
				});

				return;
			}

			state.unreadMessages[roomOfUnreadMessage].count =
				state.unreadMessages[roomOfUnreadMessage].count + 1;
		},
		pushUnreadMessageNotification: (
			state,
			action: PayloadAction<{ unreadMessageObj: IUnreadMessage }>
		) => {
			const { unreadMessageObj } = action.payload;

			state.unreadMessages.push(unreadMessageObj);
		},
		deleteUnreadMessageNotification: (
			state,
			action: PayloadAction<{ room: string }>
		) => {
			const { room } = action.payload;

			let roomToDeleteIndex = -2;
			state.unreadMessages.map((unreadMessage, index) => {
				if (unreadMessage.room === room) {
					roomToDeleteIndex = index;
				}
			});

			if (roomToDeleteIndex !== -2) {
				state.unreadMessages.splice(roomToDeleteIndex, 1);
			}
		},
		addChannelDeletionNotification: (
			state,
			action: PayloadAction<{ admin: IUser; channel: IChannel }>
		) => {
			const { admin, channel } = action.payload;
			console.log("admin:", admin);
			console.log("channel:", channel);

			state.channelDeletion.push({
				admin: admin,
				room: channel,
				type: "channelDeletion"
			});
		},
		pushChannelDeletionNotification: (
			state,
			action: PayloadAction<{ channelDeleteObj: IChannelDeletion }>
		) => {
			const { channelDeleteObj } = action.payload;

			state.channelDeletion.push(channelDeleteObj);
		},
		deleteChannelDeletionNotification: (
			state,
			action: PayloadAction<{ channel: IChannel }>
		) => {
			const { channel } = action.payload;
			console.log("delete channel:", channel);

			let channelToDeleteIndex = -2;
			state.channelDeletion.map((deleteChannel, index) => {
				if (deleteChannel.room.id === channel.id) {
					channelToDeleteIndex = index;
				}
			});
			console.log("channelToDeleteIndex:", channelToDeleteIndex);

			if (channelToDeleteIndex !== -2) {
				state.channelDeletion.splice(channelToDeleteIndex, 1);
			}
		},
		addApplyRequestNotification: (
			state,
			action: PayloadAction<{ room: IChannel; user: IUser }>
		) => {
			const { room, user } = action.payload;

			let applyExist = -2;
			state.applyRequests.map((apply, index) => {
				if (apply.room.id === room.id && apply.newUser.userId === user.userId) {
					applyExist = index;
				}
			});

			if (applyExist === -2) {
				state.applyRequests.push({
					type: "applyRequest",
					room: room,
					newUser: user
				});
			}
		},
		pushApplyRequestNotification: (
			state,
			action: PayloadAction<{ applyRequestObj: IApplyRequest }>
		) => {
			const { applyRequestObj } = action.payload;

			let applyExist = -2;
			state.applyRequests.map((apply, index) => {
				if (
					apply.room.id === applyRequestObj.room.id &&
					apply.newUser.userId === applyRequestObj.newUser.userId
				) {
					applyExist = index;
				}
			});

			if (applyExist === -2) {
				state.applyRequests.push(applyRequestObj);
			}
		},
		deleteApplyRequestNotification: (
			state,
			action: PayloadAction<{ room: IChannel; user: IUser }>
		) => {
			const { room, user } = action.payload;

			let applyExist = -2;
			state.applyRequests.map((apply, index) => {
				if (apply.room.id === room.id && apply.newUser.userId === user.userId) {
					applyExist = index;
				}
			});

			if (applyExist !== -2) {
				state.applyRequests.splice(applyExist, 1);
			}
		},
		addApplyResponseNotification: (
			state,
			action: PayloadAction<{
				room: IChannel;
				user: IUser;
				permission: boolean;
			}>
		) => {
			const { room, user, permission } = action.payload;

			let applyExist = -2;
			state.applyRequests.map((apply, index) => {
				if (apply.room.id === room.id && apply.newUser.userId === user.userId) {
					applyExist = index;
				}
			});

			if (applyExist === -2) {
				state.applyResponses.push({
					type: "applyResponse",
					room: room,
					newUser: user,
					permission: permission
				});
			}
		},
		pushApplyResponseNotification: (
			state,
			action: PayloadAction<{ applyResponseObj: IApplyResponse }>
		) => {
			const { applyResponseObj } = action.payload;

			let applyExist = -2;
			state.applyResponses.map((apply, index) => {
				if (
					apply.room.id === applyResponseObj.room.id &&
					apply.newUser.userId === applyResponseObj.newUser.userId
				) {
					applyExist = index;
				}
			});

			if (applyExist === -2) {
				state.applyResponses.push(applyResponseObj);
			}
		},
		deleteApplyResponseNotification: (
			state,
			action: PayloadAction<{ room: IChannel; user: IUser }>
		) => {
			const { room, user } = action.payload;

			let applyExist = -2;
			state.applyResponses.map((apply, index) => {
				if (apply.room.id === room.id && apply.newUser.userId === user.userId) {
					applyExist = index;
				}
			});

			if (applyExist !== -2) {
				state.applyResponses.splice(applyExist, 1);
			}
		}

		// addInvitationNotification: (state, action) => {},
		// deleteInvitationNotification: (state, action) => {},
		// addMentionNotification: (state, action) => {},
		// deleteMentionNotification: (state, action) => {}
	}
});

export const {
	addUnreadMessageNotification,
	deleteUnreadMessageNotification,
	pushUnreadMessageNotification,
	addChannelDeletionNotification,
	pushChannelDeletionNotification,
	deleteChannelDeletionNotification,
	addApplyRequestNotification,
	pushApplyRequestNotification,
	deleteApplyRequestNotification,
	addApplyResponseNotification,
	pushApplyResponseNotification,
	deleteApplyResponseNotification
} = messagesNotification.actions;
export const allNotificationsSelector = (state: RootState) =>
	state.notification;
export const unreadMessagesNotificationsSelector = (state: RootState) =>
	state.notification.unreadMessages;
export const channelDeletionNotificationsSelector = (state: RootState) =>
	state.notification.channelDeletion;
export const applyRequestsNotificationsSelector = (state: RootState) =>
	state.notification.applyRequests;
export const applyResponsesNotificationsSelector = (state: RootState) =>
	state.notification.applyResponses;
export const invitationNotificationsSelector = (state: RootState) =>
	state.notification.invitations;
export const mentionsNotificationsSelector = (state: RootState) =>
	state.notification.mentions;
// const activeChat = store.getState().activeChat.activeChat;
// export const unreadMessagesNotificationsForChatSelector = createSelector(
// 	(state: RootState) => state.notification.unreadMessages,
// 	(unreadMessages) =>
// 		unreadMessages.find(
// 			(unreadMessagesForDM) => unreadMessagesForDM.room === activeChat.id
// 		)
// );
// (unreadMessages) => unreadMessagesForDM.room === activeChat.id
export default messagesNotification.reducer;
