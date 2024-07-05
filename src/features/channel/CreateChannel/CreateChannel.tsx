import styles from "./CreateChannel.module.scss";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { newChannel } from "@/entities/channel/api/channelsApi";
import { Dispatch, SetStateAction } from "react";

interface ICreateChannel {
	name: string;
	accessability: string;
	description: string;
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function CreateChannel({
	name,
	accessability,
	description,
	onClose
}: ICreateChannel) {
	const socket = useSocketContext();

	function createHandler() {
		newChannel(socket, name, accessability, description);
		onClose(false);
	}

	return (
		<button
			onClick={createHandler}
			className={styles.createBtn}
		>
			Create
		</button>
	);
}
