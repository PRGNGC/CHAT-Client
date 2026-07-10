import styles from "./NewNotificationsIndicator.module.scss";
import { useAppSelector } from "@/shared/utils/hooks";
import { allNotificationsSelector } from "@/app/store/messageNotificationSlice/messageNotificationSlice";

export function NewNotificationsIndicator() {
	const allNotifications = useAppSelector(allNotificationsSelector);

	const allNotificationsCount = Object.values(allNotifications).reduce(
		(acc, cur) => acc + cur.length,
		0
	);

	return (
		<>
			{allNotificationsCount >= 1 && (
				<span className={styles.notificationTag}>{allNotificationsCount}</span>
			)}
		</>
	);
}
