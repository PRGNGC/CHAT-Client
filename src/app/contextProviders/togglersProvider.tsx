import { Context, createContext } from "use-context-selector";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

export let TogglersContext: Context<{
	userInfoStatus: boolean;
	setUserInfoStatus: Dispatch<SetStateAction<boolean>>;
	chatInfoStatus: boolean;
	setChatInfoStatus: Dispatch<SetStateAction<boolean>>;
	showChat: boolean;
	setShowChat: Dispatch<SetStateAction<boolean>>;
}>;

export function TogglersProvider({ children }: { children: ReactNode }) {
	const [userInfoStatus, setUserInfoStatus] = useState(false);
	const [chatInfoStatus, setChatInfoStatus] = useState(false);
	const [showChat, setShowChat] = useState(true);

	TogglersContext = createContext({
		userInfoStatus: userInfoStatus,
		setUserInfoStatus: setUserInfoStatus,
		chatInfoStatus: chatInfoStatus,
		setChatInfoStatus: setChatInfoStatus,
		showChat: showChat,
		setShowChat: setShowChat
	});

	return (
		<TogglersContext.Provider
			value={{
				userInfoStatus: userInfoStatus,
				setUserInfoStatus: setUserInfoStatus,
				chatInfoStatus: chatInfoStatus,
				setChatInfoStatus: setChatInfoStatus,
				showChat: showChat,
				setShowChat: setShowChat
			}}
		>
			{children}
		</TogglersContext.Provider>
	);
}
