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
	pushUnreadMessageNotification,
	pushOuterMessageNotification
} from "@/app/store/messageNotificationSlice/messageNotificationSlice";
import { useAppDispatch } from "@/shared/utils/hooks";
import { Loader } from "@/shared/ui/Loader/Loader";
import { useState } from "react";
import { UseFormSetError, type SubmitHandler } from "react-hook-form";

interface Inputs {
	login: string;
	password: string;
}

interface ILogin {
	seterror: UseFormSetError<Inputs>;
}

export let onSubmitLogin: SubmitHandler<Inputs>;

export function Login({ seterror }: ILogin) {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	onSubmitLogin = async function (data) {
		const { login, password } = data;

		setLoading(true);
		const response = await loginApi(login, password);
		if (response.status !== 404) {
			dispatch(signupUser({ user: response.payload.user }));
			dispatch(setAccessToken({ accessToken: response.payload.accessToken }));
			if (response.payload.user.channels[0]) {
				dispatch(
					setActiveChat({ activeChat: response.payload.user.channels[0] })
				);
			}
			response.payload.user.notifications.map((notification: any) => {
				if (notification.type === "outerMessage") {
					dispatch(
						pushOuterMessageNotification({
							outerMessageObj: notification
						})
					);
				}

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
			});
			navigate("/");
		}

		if (response.status === 404) {
			seterror("login", {
				type: "custom",
				message: "Такого пользователя не обнаружено"
			});
			setLoading(false);
		}
	};

	return (
		<button
			type="submit"
			className={styles.loginButton}
		>
			{loading && <Loader />}
			{!loading && "Войти"}
		</button>
	);
}
