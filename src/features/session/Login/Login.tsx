import styles from "./Login.module.scss";
import { loginApi } from "@/entities/session";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "@/app/store/sessionSlice/sessionSlice";
import { signupUser } from "@/app/store/userSlice/userSlice";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import {
	pushApplyRequestNotification,
	pushApplyResponseNotification,
	pushChannelDeletionNotification,
	pushUnreadMessageNotification
} from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { useAppDispatch } from "@/shared/utils/hooks";

interface ILogin {
	login: string;
	password: string;
}

export function Login({ login, password }: ILogin) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	async function loginHandler() {
		const response = await loginApi(login, password);
		if (response.status === 201) {
			dispatch(signupUser({ user: response.payload.user }));
			dispatch(setAccessToken({ accessToken: response.payload.accessToken }));
			if (response.payload.user.channels[0]) {
				dispatch(
					setActiveChat({ activeChat: response.payload.user.channels[0] })
				);
			}
			response.payload.user.notifications.map(
				(notification: { type: string; room: any }) => {
					if (notification.type === "unreadMessage") {
						dispatch(
							pushUnreadMessageNotification({
								unreadMessageObj: notification
							})
						);
					}
					if (notification.type === "channelDeletion") {
						dispatch(
							pushChannelDeletionNotification({
								channelDeleteObj: notification
							})
						);
					}
					if (notification.type === "applyEnter") {
						dispatch(
							pushApplyRequestNotification({
								applyRequestObj: notification
							})
						);
					}
					if (notification.type === "applyEnterResponse") {
						dispatch(
							pushApplyResponseNotification({
								applyResponseObj: notification
							})
						);
					}
				}
			);
			navigate("/");
		}
	}

	return (
		<button
			onClick={loginHandler}
			className={styles.loginButton}
		>
			Log in
		</button>
	);
}
