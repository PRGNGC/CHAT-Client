import { useAppSelector } from "@/shared/utils/hooks";
import styles from "./NoNotificationsMessage.module.scss";
import { allNotificationsSelector } from "@/app/store/messageNotificationSlice/messageNotificationSlice";

export function NoNotificationsMessage() {
	const allNotifications = useAppSelector(allNotificationsSelector);

	const allNotificationsCount = Object.values(allNotifications).reduce(
		(acc, cur) => acc + cur.length,
		0
	);
	return (
		<>
			{allNotificationsCount === 0 && (
				<li className={styles.noNotificationsMessage}>No notifications!</li>
			)}
		</>
	);
}
