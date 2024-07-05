import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import styles from "./LeaveChannel.module.scss";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { activeChatSelector } from "@/app/store/activeChatSlice/activeChatSlice";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { channelSelector, userSelector } from "@/app/store/userSlice/userSlice";
import { editUser } from "@/app/store/userSlice/userSlice";

export function LeaveChannel() {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const activeChat = useAppSelector(activeChatSelector);
	const channels = useAppSelector(channelSelector);
	const socket = useSocketContext();

	function leaveHandler() {
		dispatch(
			editUser({
				fieldToEdit: "channels",
				newValue: activeChat,
				operation: "delete"
			})
		);
		dispatch(setActiveChat({ activeChat: channels[0] }));
		socket.emit("leave channel", {
			room: activeChat.id,
			user: user
		});
	}

	return (
		<button
			onClick={leaveHandler}
			className={styles.leaveBtn}
		>
			Leave
		</button>
	);
}
