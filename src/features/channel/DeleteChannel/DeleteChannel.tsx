import styles from "./DeleteChannel.module.scss";
import { deleteChannelRequest } from "@/entities/channel";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { useAppSelector } from "@/shared/utils/hooks";
import { activeChatSelector } from "@/app/store/activeChatSlice/activeChatSlice";
import { IChannel } from "@/entities/channel/types";

export function DeleteChannel() {
	const socket = useSocketContext();
	const activeChat = useAppSelector(activeChatSelector);

	function deleteHandler() {
		deleteChannelRequest(socket, activeChat as IChannel);
	}

	return (
		<button
			onClick={deleteHandler}
			className={styles.delBtn}
		>
			Delete
		</button>
	);
}
