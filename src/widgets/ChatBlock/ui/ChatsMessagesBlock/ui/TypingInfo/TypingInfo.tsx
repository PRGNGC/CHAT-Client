import styles from "./TypingInfo.module.scss";
import { usersTypingSelector } from "@/app/store/usersTyping/usersTyping";
import { useAppSelector } from "@/shared/utils/hooks";

export function TypingInfo() {
	const typingUsers = useAppSelector(usersTypingSelector);

	return (
		<div className={styles.typingInfo}>
			{typingUsers.length === 1 && <p>{typingUsers[0]} is typing...</p>}
			{typingUsers.length === 2 && (
				<p>
					{typingUsers[0]}, {typingUsers[1]} are typing...
				</p>
			)}
			{typingUsers.length === 3 && (
				<p>
					{typingUsers[0]}, {typingUsers[1]}, {typingUsers[2]} are typing...
				</p>
			)}
			{typingUsers.length >= 4 && (
				<p>
					{typingUsers[0]}, {typingUsers[1]}, {typingUsers[2]} and
					{typingUsers.length - 3} more users are typing...
				</p>
			)}
		</div>
	);
}
