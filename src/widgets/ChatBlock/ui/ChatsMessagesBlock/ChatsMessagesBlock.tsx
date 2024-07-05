import styles from "./ChatsMessagesBlock.module.scss";
import { useEffect, useRef } from "react";
import type { IMessage } from "@/entities/message/types";
import { TypingInfo } from "./ui/TypingInfo";
import { ChatHeader } from "./ui/ChatHeader";
import { DownloadFile } from "@/features/message/DownloadFile";
import { activeChatSelector } from "@/app/store/activeChatSlice/activeChatSlice";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { onlineUsersSelector } from "@/app/store/onlineUsersSlice/onlineUserSlice";
import { useAppSelector } from "@/shared/utils/hooks";
import { SpecialMessage } from "./ui/SpecialMessage";

export function ChatsMessagesBlock() {
	const onlineUsers = useAppSelector(onlineUsersSelector);
	const activeChat = useAppSelector(activeChatSelector);
	const user = useAppSelector(userSelector);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "end"
		});
	}, []);

	if (!Object.keys(activeChat).length) {
		return <div className={styles.chatsMessagesBlock}></div>;
	}

	return (
		<>
			<div className={styles.chatsMessagesBlock}>
				<ChatHeader />
				<div
					className={styles.chatsMessages}
					ref={ref}
				>
					{activeChat.messages.map((message: IMessage) => {
						if (message.type !== "usual") {
							return (
								<SpecialMessage
									key={crypto.randomUUID()}
									message={message}
								/>
							);
						}

						return (
							<div
								key={crypto.randomUUID()}
								className={
									message.userName === user.name
										? styles.yourMessageBlock
										: styles.othersMessageBlock
								}
							>
								{onlineUsers.includes(message.userId) && (
									<span className={styles.onlineIndicator}></span>
								)}
								{!onlineUsers.includes(message.userId) && (
									<span className={styles.offlineIndicator}></span>
								)}
								<div className={styles.commonMessageInfo}>
									<img
										// src={`data:image/png;base64, ${message.userImg}`}
										src={message.userImg}
										alt="img"
										width={60}
										height={60}
										className={styles.userAvatar}
									/>
									<div className={styles.messageTextInfo}>
										<p className={styles.userName}>{message.userName}</p>
										<div className={styles.userMessageBlock}>
											<p className={styles.userMessage}>{message.content}</p>
										</div>
									</div>
								</div>
								{message.filesInfo !== undefined && (
									<div className={styles.filesBlock}>
										{message.filesInfo.map((file) => {
											return <DownloadFile file={file} />;
										})}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<TypingInfo />
		</>
	);
}
