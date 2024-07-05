import { useState } from "react";
import styles from "./DmsAccordion.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { dmSelector, userSelector } from "@/app/store/userSlice/userSlice";
import { onlineUsersSelector } from "@/app/store/onlineUsersSlice/onlineUserSlice";
import { deleteUnreadMessageNotification } from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { unreadMessagesNotificationsSelector } from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { clearNotification } from "@/entities/notification";
import { IDm } from "@/entities/dm/types";

export function DmsAccordion() {
	const [DMSearch, setDMSearch] = useState<string>("");
	const user = useAppSelector(userSelector);
	const dms = useAppSelector(dmSelector);
	const onlineUsers = useAppSelector(onlineUsersSelector);
	const unreadMessagesNotifications = useAppSelector(
		unreadMessagesNotificationsSelector
	);
	const dispatch = useAppDispatch();
	const socket = useSocketContext();

	return (
		<details className={styles.dmsAccordion}>
			<input
				type="search"
				className={styles.dmsSearch}
				onChange={(e) => setDMSearch(e.target.value)}
				placeholder="Search DMs..."
			/>
			<summary className={styles.dmsAccordionTitle}>DMs</summary>
			{dms.map((dm) => {
				const appropriateUser =
					user.userId === dm.firstUser.userId ? dm.secondUser : dm.firstUser;

				const notificationsForDM = unreadMessagesNotifications.filter(
					(unreadMessage) => unreadMessage.room === dm.id
				)[0];

				if (DMSearch !== "" && !appropriateUser.name.includes(DMSearch)) {
					return null;
				}

				return (
					<div
						className={styles.dmsAccordionItem}
						key={crypto.randomUUID()}
						onClick={() => {
							const newActiveChat = dms.filter((chat) => chat.id === dm.id)[0];

							if (!notificationsForDM) {
								dispatch(setActiveChat({ activeChat: newActiveChat }));
								return;
							}

							const firstUnreadMessageIndex = newActiveChat.messages.findIndex(
								(message) =>
									message.content ===
									notificationsForDM.firstUnreadMessage?.content
							);

							const alteredActiveChat: IDm = JSON.parse(
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
							dispatch(deleteUnreadMessageNotification({ room: dm.id }));
							clearNotification(
								socket,
								user,
								notificationsForDM.type,
								notificationsForDM.room
							);
						}}
					>
						{onlineUsers.includes(appropriateUser.userId) && (
							<span className={styles.onlineIndicator}></span>
						)}
						<img
							src={appropriateUser.userImg}
							alt="img"
							width={47}
							height={47}
							className={styles.dmsImg}
						/>
						<p className={styles.dmsItemText}>{appropriateUser.name}</p>
						{notificationsForDM && (
							<p className={styles.notificationTag}>
								{notificationsForDM.count}
							</p>
						)}
					</div>
				);
			})}
		</details>
	);
}
