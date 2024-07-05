import styles from "./Chat.module.scss";
import { Ellipse2 } from "@/shared/ui/Ellipse2";
import { Ellipse3 } from "@/shared/ui/Ellipse3";
import { ChatsNavigation } from "@/widgets/ChatsNavigation";
import { Navbar } from "@/widgets/Navbar";
import { ChatBlock } from "@/widgets/ChatBlock";
import { UserInfo } from "@/widgets/UserInfo";
import { useEffect } from "react";
import { ChatInfo } from "@/widgets/ChatInfo";
import { SearchBlock } from "@/widgets/SearchBlock";
import { connectToRooms, getConnectionStatuses } from "@/entities/session";
import { enterDm } from "@/entities/dm";
import { getNewDm } from "@/entities/dm/api/dmsApi";
import {
	deleteChannelResponse,
	getApplyEnterRequest,
	getApplyEnterResponse,
	getNewChannel
} from "@/entities/channel/api/channelsApi";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { channelSelector, userSelector } from "@/app/store/userSlice/userSlice";
import { useAppSelector } from "@/shared/utils/hooks";
import { activeChatSelector } from "@/app/store/activeChatSlice/activeChatSlice";
import { receiveMessage, receiveMessageStatus } from "@/entities/message";
import { useTogglersValue } from "@/app/contextProviders/useTogglers";

export function Chat() {
	const user = useAppSelector(userSelector);
	const channels = useAppSelector(channelSelector);
	const activeChat = useAppSelector(activeChatSelector);
	const socket = useSocketContext();
	const userInfoStatus = useTogglersValue((v) => v.userInfoStatus);
	const showChat = useTogglersValue((v) => v.showChat);
	const chatInfoStatus = useTogglersValue((v) => v.chatInfoStatus);

	useEffect(() => {
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		connectToRooms(socket);
		getConnectionStatuses(socket);
		enterDm(socket);
		getNewDm(socket);
		getNewChannel(socket);
		deleteChannelResponse(socket);
		getApplyEnterRequest(socket);
		getApplyEnterResponse(socket);
		receiveMessageStatus(socket);
		receiveMessage(socket);

		return () => {
			socket.off("online");
			socket.off("enter dm");
			socket.off("new dm");
			socket.off("new channel");
			socket.off("delete channel");
			socket.off("apply enter");
			socket.off("apply response");
			socket.off("typing");
			socket.off("message");
		};
	}, [user, activeChat, channels]);

	return (
		<div className={styles.chatPage}>
			<div className={styles.chatsNavigationBlock}>
				<ChatsNavigation />
			</div>
			<div className={styles.mainBlock}>
				<div className={styles.navbarBlock}>
					<Navbar />
				</div>
				<div className={styles.mainBlockContent}>
					{showChat && <ChatBlock />}
					{!showChat && <SearchBlock />}
					{userInfoStatus && <UserInfo />}
					{chatInfoStatus && <ChatInfo />}
				</div>
			</div>
			<Ellipse2 />
			<Ellipse3 />
		</div>
	);
}
