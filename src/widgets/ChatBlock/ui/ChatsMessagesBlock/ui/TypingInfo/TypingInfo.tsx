import styles from "./TypingInfo.module.scss";
import { usersTypingSelector } from "@/app/store/usersTyping/usersTyping";
import { useAppSelector } from "@/shared/utils/hooks";

export function TypingInfo() {
	const typingUsers = useAppSelector(usersTypingSelector);

	return (
		<div className={styles.typingInfo}>
			{typingUsers.length === 1 && <p>{typingUsers[0]} печатает...</p>}
			{typingUsers.length === 2 && (
				<p>
					{typingUsers[0]}, {typingUsers[1]} печатают...
				</p>
			)}
			{typingUsers.length === 3 && (
				<p>
					{typingUsers[0]}, {typingUsers[1]}, {typingUsers[2]} печатают...
				</p>
			)}
			{typingUsers.length >= 4 && (
				<p>
					{typingUsers[0]}, {typingUsers[1]}, {typingUsers[2]} и ещё
					{typingUsers.length - 3} пользователя печатают...
				</p>
			)}
		</div>
	);
}
