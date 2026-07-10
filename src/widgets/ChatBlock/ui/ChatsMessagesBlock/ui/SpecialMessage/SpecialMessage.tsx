import styles from "./SpecialMessage.module.scss";
import { useAppSelector } from "@/shared/utils/hooks";
import { userSelector } from "@/app/store/userSlice/userSlice";
import type { IMessage } from "@/entities/message/types";

interface ISpecialMessage {
	message: IMessage;
	keyVal: string;
}

export function SpecialMessage({ message, keyVal }: ISpecialMessage) {
	const user = useAppSelector(userSelector);

	if (message.type === "enter" && message.userId !== user.userId) {
		return (
			<div
				key={keyVal}
				className={styles.specialMessage}
			>
				<p>{message.userName} вступил(а) в группу</p>
			</div>
		);
	}

	if (message.type === "enter" && message.userId === user.userId) {
		return (
			<div
				key={keyVal}
				className={styles.specialMessage}
			>
				<p>Вы вступили в группу</p>
			</div>
		);
	}

	if (message.type === "leave" && message.userId !== user.userId) {
		return (
			<div
				key={keyVal}
				className={styles.specialMessage}
			>
				<p>{message.userName} покинул(а) группу</p>
			</div>
		);
	}

	if (message.type === "leave" && message.userId === user.userId) {
		return (
			<div
				key={keyVal}
				className={styles.specialMessage}
			>
				<p>Вы покинули группу</p>
			</div>
		);
	}

	if (message.type === "create") {
		return (
			<div
				key={keyVal}
				className={styles.specialMessage}
			>
				<p>{message.content}</p>
			</div>
		);
	}

	if (message.type === "unread") {
		return (
			<div
				key={keyVal}
				className={styles.specialMessage}
			>
				<p>{message.content}</p>
			</div>
		);
	}

	return null;
}
