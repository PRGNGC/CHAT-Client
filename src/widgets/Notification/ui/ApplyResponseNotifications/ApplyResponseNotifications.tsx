import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import styles from "./ApplyResponseNotifications.module.scss";
import {
	applyResponsesNotificationsSelector,
	deleteApplyResponseNotification
} from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { Dispatch, SetStateAction } from "react";
import { clearNotification } from "@/entities/notification";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { userSelector } from "@/app/store/userSlice/userSlice";

interface IApplyResponseNotifications {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function ApplyResponseNotifications({
	onClose
}: IApplyResponseNotifications) {
	const applyResponseNotifications = useAppSelector(
		applyResponsesNotificationsSelector
	);
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);
	const dispatch = useAppDispatch();

	return (
		<>
			{applyResponseNotifications.map((applyResponse) => {
				console.log(
					"{applyResponseNotifications.map ~ applyResponse:",
					applyResponse
				);
				if (!applyResponse.permission) {
					return (
						<li
							key={crypto.randomUUID()}
							className={styles.applyResponseNotification}
							onClick={() => {
								console.log(
									"{applyResponseNotifications.map ~ applyResponse.newUser:",
									applyResponse.newUser
								);
								onClose(false);
								clearNotification(
									socket,
									user,
									applyResponse.type,
									applyResponse.room
								);
								dispatch(
									deleteApplyResponseNotification({
										room: applyResponse.room,
										user: applyResponse.newUser
									})
								);
							}}
						>
							Your apply request to chat #{applyResponse.room.name} has denied
						</li>
					);
				}
				return (
					<li
						key={crypto.randomUUID()}
						className={styles.applyResponseNotification}
						onClick={() => {
							onClose(false);
							clearNotification(
								socket,
								user,
								applyResponse.type,
								applyResponse.room
							);
							dispatch(
								deleteApplyResponseNotification({
									room: applyResponse.room,
									user: applyResponse.newUser
								})
							);
						}}
					>
						Your apply request to chat #{applyResponse.room.name} has approved
					</li>
				);
			})}
		</>
	);
}
