import styles from "./DeletionNotifications.module.scss";
import {
	channelDeletionNotificationsSelector,
	deleteChannelDeletionNotification
} from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { clearNotification } from "@/entities/notification";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { Dispatch, SetStateAction } from "react";

interface IDeletionNotifications {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function DeletionNotifications({ onClose }: IDeletionNotifications) {
	const deletionNotifications = useAppSelector(
		channelDeletionNotificationsSelector
	);
	const dispatch = useAppDispatch();
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);
	return (
		<>
			{deletionNotifications.map((notification) => {
				return (
					<li
						key={crypto.randomUUID()}
						onClick={() => {
							dispatch(
								deleteChannelDeletionNotification({
									channel: notification.room
								})
							);
							clearNotification(
								socket,
								user,
								notification.type,
								notification.room
							);
							onClose((prev) => !prev);
						}}
						className={styles.deletionNotification}
					>
						{`User ${notification.admin.name} deleted channel #${notification.room.name}`}
					</li>
				);
			})}
		</>
	);
}
