import { useState } from "react";
import styles from "./ChannelsAccordion.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { channelSelector, userSelector } from "@/app/store/userSlice/userSlice";
import { deleteUnreadMessageNotification } from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { unreadMessagesNotificationsSelector } from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { clearNotification } from "@/entities/notification";
import { IChannel } from "@/entities/channel/types";

export function ChannelsAccordion() {
	const [channelSearch, setChannelSearch] = useState<string>("");
	const channels = useAppSelector(channelSelector);
	const user = useAppSelector(userSelector);
	const unreadMessages = useAppSelector(unreadMessagesNotificationsSelector);
	const dispatch = useAppDispatch();
	const socket = useSocketContext();

	return (
		<details className={styles.channelsAccordion}>
			<summary className={styles.channelsAccordionTitle}>Channels</summary>
			<input
				type="search"
				className={styles.channelsSearch}
				onChange={(e) => setChannelSearch(e.target.value)}
				placeholder="Search channels..."
			/>
			{channels.map((channel) => {
				const notificationsForChannel = unreadMessages.filter(
					(unreadMessage) => unreadMessage.room === channel.id
				)[0];

				if (channelSearch !== "" && !channel.name.includes(channelSearch)) {
					return null;
				}

				return (
					<div
						className={styles.channelsAccordionItem}
						key={crypto.randomUUID()}
						onClick={() => {
							const newActiveChat = channels.filter(
								(room) => room.id === channel.id
							)[0];

							if (!notificationsForChannel) {
								dispatch(setActiveChat({ activeChat: newActiveChat }));
								return;
							}

							const firstUnreadMessageIndex = newActiveChat.messages.findIndex(
								(message) =>
									message.content ===
									notificationsForChannel.firstUnreadMessage.content
							);

							const alteredActiveChat: IChannel = JSON.parse(
								JSON.stringify(newActiveChat)
							);

							alteredActiveChat.messages.splice(firstUnreadMessageIndex, 0, {
								content: "Unread messages",
								type: "unread",
								userName: "",
								userImg: "",
								userId: "",
								filesInfo: []
							});

							dispatch(setActiveChat({ activeChat: alteredActiveChat }));
							dispatch(deleteUnreadMessageNotification({ room: channel.id }));
							clearNotification(
								socket,
								user,
								notificationsForChannel.type,
								notificationsForChannel.room
							);
						}}
					>
						<p className={styles.itemText}>#{channel.name}</p>
						{notificationsForChannel && (
							<p className={styles.notificationTag}>
								{notificationsForChannel.count}
							</p>
						)}
					</div>
				);
			})}
		</details>
	);
}
