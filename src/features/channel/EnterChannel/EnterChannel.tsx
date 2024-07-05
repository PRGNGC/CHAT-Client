import styles from "./EnterChannel.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { editUser } from "@/app/store/userSlice/userSlice";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { IChannel } from "@/entities/channel/types";
import { useTogglersHandler } from "@/app/contextProviders/useTogglers";

interface IEnterChannel {
	newChannel: IChannel;
}

export function EnterChannel({ newChannel }: IEnterChannel) {
	const dispatch = useAppDispatch();
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);
	const setShowChat = useTogglersHandler((v) => v.setShowChat);

	function enterHandler() {
		dispatch(setActiveChat({ activeChat: newChannel }));
		dispatch(
			editUser({
				fieldToEdit: "channels",
				newValue: newChannel,
				operation: "add"
			})
		);
		setShowChat(true);
		socket.emit("enter channel", {
			room: newChannel.id,
			user: user
		});
	}

	return (
		<button
			onClick={enterHandler}
			className={styles.enterBtn}
		>
			Enter
		</button>
	);
}
