import { denyApplyEnter } from "@/entities/channel/api/channelsApi";
import styles from "./DenyApplyEnterChannel.module.scss";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { IApplyRequest } from "@/entities/notification/types";
import { Dispatch, SetStateAction } from "react";
import { clearNotification } from "@/entities/notification";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { deleteApplyRequestNotification } from "@/app/store/messageNotificationSlice/messageNotificationSlice";

interface IDenyApplyEnterChannel {
	applyRequest: IApplyRequest;
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function DenyApplyEnterChannel({
	applyRequest,
	onClose
}: IDenyApplyEnterChannel) {
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);
	const dispatch = useAppDispatch();

	function denyApplyEnterHandler() {
		onClose((prev) => !prev);
		denyApplyEnter(socket, applyRequest.newUser, applyRequest.room);
		clearNotification(socket, user, applyRequest.type, applyRequest.room);
		dispatch(
			deleteApplyRequestNotification({
				room: applyRequest.room,
				user: applyRequest.newUser
			})
		);
	}

	return (
		<button
			className={styles.denyBtn}
			onClick={denyApplyEnterHandler}
		>
			Deny
		</button>
	);
}
