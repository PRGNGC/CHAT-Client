import styles from "./SpecialMessage.module.scss";
import { useAppSelector } from "@/shared/utils/hooks";
import { userSelector } from "@/app/store/userSlice/userSlice";
import type { IMessage } from "@/entities/message/types";

interface ISpecialMessage {
	message: IMessage;
	key: string;
}

export function SpecialMessage({ message, key }: ISpecialMessage) {
	const user = useAppSelector(userSelector);

	if (message.type === "enter" && message.userId !== user.userId) {
		return (
			<div
				key={key}
				className={styles.specialMessage}
			>
				<p>User {message.userName} enter the chat</p>
			</div>
		);
	}

	if (message.type === "enter" && message.userId === user.userId) {
		return (
			<div
				key={key}
				className={styles.specialMessage}
			>
				<p>You enter the chat</p>
			</div>
		);
	}

	if (message.type === "leave" && message.userId !== user.userId) {
		return (
			<div
				key={key}
				className={styles.specialMessage}
			>
				<p>User {message.userName} left the chat</p>
			</div>
		);
	}

	if (message.type === "leave" && message.userId === user.userId) {
		return (
			<div
				key={key}
				className={styles.specialMessage}
			>
				<p>You left the chat</p>
			</div>
		);
	}

	if (message.type === "create") {
		return (
			<div
				key={key}
				className={styles.specialMessage}
			>
				<p>{message.content}</p>
			</div>
		);
	}

	if (message.type === "unread") {
		return (
			<div
				key={key}
				className={styles.specialMessage}
			>
				<p>{message.content}</p>
			</div>
		);
	}

	return null;
}
