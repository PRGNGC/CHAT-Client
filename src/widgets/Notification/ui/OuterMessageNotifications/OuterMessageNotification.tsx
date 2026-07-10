import styles from "./OuterMessageNotification.module.scss";
import {
	// channelDeletionNotificationsSelector,
	// deleteChannelDeletionNotification,
	outerMessagesNotificationsSelector,
	deleteOuterMessageNotification
} from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { clearNotification } from "@/entities/notification";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { Dispatch, SetStateAction } from "react";

interface IDeletionNotifications {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function OuterMessagesNotifications({
	onClose
}: IDeletionNotifications) {
	const outerMessageNotifications = useAppSelector(
		outerMessagesNotificationsSelector
	);
	const dispatch = useAppDispatch();
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);

	return (
		<>
			{outerMessageNotifications.map((notification) => {
				return (
					<li
						key={crypto.randomUUID()}
						onClick={() => {
							dispatch(deleteOuterMessageNotification());
							clearNotification(socket, user, notification.type);
							onClose((prev) => !prev);
						}}
						className={styles.deletionNotification}
					>
						{`На вашем аккаунте ${notification.account} ${notification.count} новых сообщения`}
					</li>
				);
			})}
		</>
	);
}
