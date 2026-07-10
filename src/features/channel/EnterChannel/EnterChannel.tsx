import styles from "./EnterChannel.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { editUser } from "@/app/store/userSlice/userSlice";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { IChannel } from "@/entities/channel/types";
import { enterChannel } from "@/entities/channel/api/channelsApi";
import { toggleShowChat } from "@/app/store/togglersSlice/togglersSlice";

interface IEnterChannel {
	newChannel: IChannel;
}

export function EnterChannel({ newChannel }: IEnterChannel) {
	const dispatch = useAppDispatch();
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);

	function enterHandler() {
		dispatch(setActiveChat({ activeChat: newChannel }));
		dispatch(toggleShowChat());
		dispatch(
			editUser({
				fieldToEdit: "channels",
				newValue: newChannel,
				operation: "add"
			})
		);
		// enterChannel(socket, newChannel.id);
		socket.emit("enter_channel", {
			room: newChannel.id,
			user: user
		});
	}

	return (
		<button
			onClick={enterHandler}
			className={styles.enterBtn}
		>
			Вступить
		</button>
	);
}
