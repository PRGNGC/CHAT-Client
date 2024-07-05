import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./sessionSlice/sessionSlice";
import userSlice from "./userSlice/userSlice";
import activeChatSlice from "./activeChatSlice/activeChatSlice";
import channelsSlice from "./channelsSlice/channelsSlice";
import dmsSlice from "./dmsSlice/dmsSlice";
import messageNotificationSlice from "./messageNotificationSlice/messageNotificationSlice";
import usersTyping from "./usersTyping/usersTyping";
import onlineUserSlice from "./onlineUsersSlice/onlineUserSlice";

export const store = configureStore({
	reducer: {
		session: sessionSlice,
		user: userSlice,
		activeChat: activeChatSlice,
		channels: channelsSlice,
		dms: dmsSlice,
		notification: messageNotificationSlice,
		typing: usersTyping,
		onlineUser: onlineUserSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
