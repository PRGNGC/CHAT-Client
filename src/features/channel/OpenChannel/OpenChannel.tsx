import styles from "./OpenChannel.module.scss";
import { useAppDispatch } from "@/shared/utils/hooks";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { IChannel } from "@/entities/channel/types";
import { useTogglersHandler } from "@/app/contextProviders/useTogglers";

interface IOpenChannel {
	existingChannel: IChannel;
}

export function OpenChannel({ existingChannel }: IOpenChannel) {
	const dispatch = useAppDispatch();
	const setShowChat = useTogglersHandler((v) => v.setShowChat);

	function openHandler() {
		dispatch(setActiveChat({ activeChat: existingChannel }));
		setShowChat(true);
	}

	return (
		<button
			onClick={openHandler}
			className={styles.openBtn}
		>
			Go to channel
		</button>
	);
}
