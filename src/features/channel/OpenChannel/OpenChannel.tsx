import styles from "./OpenChannel.module.scss";
import { useAppDispatch } from "@/shared/utils/hooks";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { IChannel } from "@/entities/channel/types";
import { toggleShowChat } from "@/app/store/togglersSlice/togglersSlice";

interface IOpenChannel {
	existingChannel: IChannel;
}

export function OpenChannel({ existingChannel }: IOpenChannel) {
	const dispatch = useAppDispatch();

	function openHandler() {
		dispatch(setActiveChat({ activeChat: existingChannel }));
		dispatch(toggleShowChat());
	}

	return (
		<button
			onClick={openHandler}
			className={styles.openBtn}
		>
			Перейти
		</button>
	);
}
