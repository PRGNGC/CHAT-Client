import { useAppSelector } from "@/shared/utils/hooks";
import styles from "./ApplyRequestNotifications.module.scss";
import { applyRequestsNotificationsSelector } from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { ApproveApplyEnterChannel } from "@/features/channel/ApproveApplyEnterChannel";
import { DenyApplyEnterChannel } from "@/features/channel/DenyApplyEnterChannel";
import { Dispatch, SetStateAction } from "react";

interface IApplyRequestNotifications {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function ApplyRequestNotifications({
	onClose
}: IApplyRequestNotifications) {
	const applyRequestNotifications = useAppSelector(
		applyRequestsNotificationsSelector
	);

	return (
		<>
			{applyRequestNotifications.map((applyRequest) => {
				console.log(
					"{applyRequestNotifications.map ~ applyRequest:",
					applyRequest
				);
				return (
					<li
						key={crypto.randomUUID()}
						className={styles.applyRequestNotification}
					>
						<p>
							{`User ${applyRequest.newUser.name} wants enter the chat #${applyRequest.room.name}`}
						</p>
						<ApproveApplyEnterChannel
							onClose={onClose}
							applyRequest={applyRequest}
						/>
						<DenyApplyEnterChannel
							onClose={onClose}
							applyRequest={applyRequest}
						/>
					</li>
				);
			})}
		</>
	);
}
