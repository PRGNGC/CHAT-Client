import styles from "./CreateMessage.module.scss";
import { SendSvg } from "@/shared/ui/SendSvg";
import { sendMessage } from "@/entities/message";
import { Dispatch, SetStateAction } from "react";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";

interface ICreateMessage {
	message: string;
	files?: File[] | null;
	onEraseMessage: Dispatch<SetStateAction<string>>;
	onEraseFiles: Dispatch<SetStateAction<File[] | null>>;
}

export function CreateMessage({
	message,
	files,
	onEraseFiles,
	onEraseMessage
}: ICreateMessage) {
	const socket = useSocketContext();

	function sendHandler() {
		sendMessage(socket, message, files);
		onEraseFiles(null);
		onEraseMessage("");
	}

	return (
		<div
			onClick={sendHandler}
			className={styles.sendMessageButton}
		>
			<SendSvg />
		</div>
	);
}
