import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "@/app/store/sessionSlice/sessionSlice";
import userSlice from "@/app/store/userSlice/userSlice";
import activeChatSlice from "@/app/store/activeChatSlice/activeChatSlice";
import channelsSlice from "@/app/store/channelsSlice/channelsSlice";
import dmsSlice from "@/app/store/dmsSlice/dmsSlice";
import messageNotificationSlice from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import usersTyping from "@/app/store/usersTyping/usersTyping";
import onlineUserSlice from "@/app/store/onlineUsersSlice/onlineUserSlice";
import { MemoryRouter } from "react-router-dom";

export function renderWithProvidersReduxAndRouter(
	ui: React.ReactNode,
	{
		store = configureStore({
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
		}),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<MemoryRouter>
				<Provider store={store}>{children}</Provider>
			</MemoryRouter>
		);
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
