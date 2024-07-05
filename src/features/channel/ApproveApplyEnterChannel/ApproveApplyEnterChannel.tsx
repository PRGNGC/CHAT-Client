import { approveApplyEnter } from "@/entities/channel/api/channelsApi";
import styles from "./ApproveApplyEnterChannel.module.scss";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import type { IApplyRequest } from "@/entities/notification/types";
import { Dispatch, SetStateAction } from "react";
import { clearNotification } from "@/entities/notification";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { deleteApplyRequestNotification } from "@/app/store/messageNotificationSlice/messageNotificationSlice";

interface IApproveApplyEnterChannel {
	applyRequest: IApplyRequest;
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function ApproveApplyEnterChannel({
	applyRequest,
	onClose
}: IApproveApplyEnterChannel) {
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);
	const dispatch = useAppDispatch();

	function approveApplyEnterHandler() {
		approveApplyEnter(socket, applyRequest.newUser, applyRequest.room);
		onClose((prev) => !prev);
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
			className={styles.approveBtn}
			onClick={approveApplyEnterHandler}
		>
			Approve
		</button>
	);
}
