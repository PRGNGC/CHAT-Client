import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import styles from "./LeaveChannel.module.scss";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { activeChatSelector } from "@/app/store/activeChatSlice/activeChatSlice";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { channelSelector, userSelector } from "@/app/store/userSlice/userSlice";
import { editUser } from "@/app/store/userSlice/userSlice";
import { IChannel } from "@/entities/channel/types";

export function LeaveChannel() {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const activeChat = useAppSelector(activeChatSelector);
	const channels = useAppSelector(channelSelector);
	const socket = useSocketContext();

	// console.log("leave - ", socket);

	function leaveHandler() {
		dispatch(
			editUser({
				fieldToEdit: "channels",
				newValue: activeChat,
				operation: "delete"
			})
		);
		// dispatch(setActiveChat({ activeChat: channels[0] }));

		// специальный синтаксис для того, чтобы не устанавливать активный чат
		dispatch(setActiveChat({ activeChat: {} as IChannel }));
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
			Покинуть чат
		</button>
	);
}
