import styles from "./Notification.module.scss";
import { BellSvg } from "@/shared/ui/BellSvg";
import { useState } from "react";
import { NewNotificationsIndicator } from "./ui/NewNotificationsIndicator";
import { UnreadMessagesNotifications } from "./ui/UnreadMessagesNotifications";
import { DeletionNotifications } from "./ui/DeletionNotifications";
import { ApplyRequestNotifications } from "./ui/ApplyRequestNotifications";
import { ApplyResponseNotifications } from "./ui/ApplyResponseNotifications";
import { NoNotificationsMessage } from "./ui/NoNotificationsMessage";

export function Notification() {
	const [notificationBlock, setNotificationBlock] = useState<boolean>(false);

	return (
		<div className={styles.notificationBlock}>
			<BellSvg onClose={setNotificationBlock} />

			<NewNotificationsIndicator />
			{notificationBlock && (
				<ul className={styles.notificationList}>
					<NoNotificationsMessage />
					<UnreadMessagesNotifications onClose={setNotificationBlock} />
					<DeletionNotifications onClose={setNotificationBlock} />
					<ApplyRequestNotifications onClose={setNotificationBlock} />
					<ApplyResponseNotifications onClose={setNotificationBlock} />
				</ul>
			)}
		</div>
	);
}
