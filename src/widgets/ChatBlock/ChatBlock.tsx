import styles from "./ChatBlock.module.scss";
import { CreateMessageForm } from "./ui/CreateMessageForm";
import { ChatsMessagesBlock } from "./ui/ChatsMessagesBlock";

export function ChatBlock() {
	return (
		<div className={styles.chatBlock}>
			<div className={styles.overshadowing}></div>
			<ChatsMessagesBlock />
			<CreateMessageForm />
		</div>
	);
}
