import styles from "./Logout.module.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/app/store/userSlice/userSlice";
import { logoutApi } from "@/entities/session";
import { eraseAccessToken } from "@/app/store/sessionSlice/sessionSlice";
import { eraseActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { eraseChannels } from "@/app/store/channelsSlice/channelsSlice";
import { eraseDms } from "@/app/store/dmsSlice/dmsSlice";

export function Logout() {
	const dispatch = useDispatch();

	async function logoutHandler() {
		dispatch(logoutUser());
		dispatch(eraseAccessToken());
		dispatch(eraseActiveChat());
		dispatch(eraseDms());
		dispatch(eraseChannels());
		await logoutApi();
	}

	return (
		<button
			onClick={logoutHandler}
			className={styles.logoutButton}
		>
			Log out
		</button>
	);
}
