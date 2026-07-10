import styles from "./UnreadMessagesNotifications.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { unreadMessagesNotificationsSelector } from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { dmSelector } from "@/app/store/userSlice/userSlice";
import { channelSelector } from "@/app/store/userSlice/userSlice";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { deleteUnreadMessageNotification } from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { clearNotification } from "@/entities/notification";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { Dispatch, SetStateAction } from "react";
import { IChannel } from "@/entities/channel/types";

interface IUnreadMessagesNotifications {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function UnreadMessagesNotifications({
	onClose
}: IUnreadMessagesNotifications) {
	const channels = useAppSelector(channelSelector);
	const dms = useAppSelector(dmSelector);
	const dispatch = useAppDispatch();
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);
	const unreadMessagesNotifications = useAppSelector(
		unreadMessagesNotificationsSelector
	);

	return (
		<>
			{unreadMessagesNotifications.map((notification) => {
				// определение правильных падежей для уведомления
				const isChannel = channels.filter(
					(channel) => channel.id === notification.room
				);
				const isDm = dms.filter((dm) => dm.id === notification.room);

				const currentChatName = isChannel[0]
					? isChannel[0].name
					: isDm[0].firstUser.userId === user.userId
						? isDm[0].secondUser.name
						: isDm[0].firstUser.name;

				let notificationText = "";
				if (
					notification.count.toString().split("").pop() === "1" &&
					notification.count !== 11
				) {
					// notificationText = `#${notification.room} - ${notification.count} новое сообщение`;
					notificationText = `#${currentChatName} - ${notification.count} новое сообщение`;
				} else {
					// notificationText = `#${notification.room} - ${notification.count} новых сообщений`;
					notificationText = `#${currentChatName} - ${notification.count} новых сообщений`;
				}

				return (
					<li
						key={crypto.randomUUID()}
						onClick={() => {
							const channel = channels.filter(
								(channel) => channel.id === notification.room
							);
							const dm = dms.filter((dm) => dm.id === notification.room);

							const newActiveChat = channel[0] ? channel[0] : dm[0];

							const firstUnreadMessageIndex = newActiveChat.messages.findIndex(
								(message) =>
									message.content === notification.firstUnreadMessage.content
							);

							const alteredActiveChat: IChannel = JSON.parse(
								JSON.stringify(newActiveChat)
							);

							alteredActiveChat.messages.splice(firstUnreadMessageIndex, 0, {
								content: "Непрочитанные сообщения",
								type: "unread",
								userName: "",
								userImg: "",
								userId: "",
								filesInfo: [],
								wroteAt: ""
							});

							dispatch(
								setActiveChat({
									activeChat: alteredActiveChat
								})
							);
							dispatch(
								deleteUnreadMessageNotification({ room: notification.room })
							);
							clearNotification(
								socket,
								user,
								notification.type,
								notification.room
							);
							onClose((prev) => !prev);
						}}
						className={styles.unreadMessageNotification}
					>
						{notificationText}
						{/* #{notification.room} - {notification.count} новых сообщений */}
					</li>
				);
			})}
		</>
	);
}
