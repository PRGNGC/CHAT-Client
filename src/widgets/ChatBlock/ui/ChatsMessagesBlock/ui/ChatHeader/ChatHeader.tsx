import styles from "./ChatHeader.module.scss";
import { NewUserSvg } from "@/shared/ui/NewUserSvg";
import { PhoneSvg } from "@/shared/ui/PhoneSvg";
import { StarSvg } from "@/shared/ui/StarSvg";
import { ExitSvg } from "@/shared/ui/ExitSvg";
import { EraseSvg } from "@/shared/ui/EraseSvg";
import type { IChannel } from "@/entities/channel/types";
import type { IDm } from "@/entities/dm/types";
import { useAppSelector } from "@/shared/utils/hooks";
import { useState } from "react";
import { createPortal } from "react-dom";
import { DeleteModal } from "@/widgets/DeleteModal";
import { activeChatSelector } from "@/app/store/activeChatSlice/activeChatSlice";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { onlineUsersSelector } from "@/app/store/onlineUsersSlice/onlineUserSlice";
import { LeaveModal } from "@/widgets/LeaveModal";
import { useTogglersHandler } from "@/app/contextProviders/useTogglers";

export function ChatHeader() {
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [leaveModal, setLeaveModal] = useState<boolean>(false);
	const activeChat = useAppSelector(activeChatSelector);
	const user = useAppSelector(userSelector);
	const onlineUsers = useAppSelector(onlineUsersSelector);
	const setChatInfoStatus = useTogglersHandler((v) => v.setChatInfoStatus);

	return (
		<>
			{activeChat.type === "channel" ? (
				<div className={styles.chatsMessagesCommonInfo}>
					<p className={styles.chatName}>#{(activeChat as IChannel).name}</p>
					<div className={styles.commonInfoSecondBlock}>
						<div className={styles.participantsImages}>
							{(activeChat as IChannel).participants.map(
								(participant, index) => {
									if (index >= 3) return;
									return (
										<img
											key={crypto.randomUUID()}
											alt="img"
											src={participant.userImg}
											className={styles.participantImg}
											width={42}
											height={42}
										/>
									);
								}
							)}
						</div>
						<p className={styles.chatUserCount}>
							{(activeChat as IChannel).participants.length}
						</p>
						<NewUserSvg />
						<div
							className={styles.additionalInfoSvg}
							onClick={() => setChatInfoStatus((prev) => !prev)}
						>
							<span className={styles.circle}></span>
							<span className={styles.stick}></span>
						</div>
						{user.userId !== (activeChat as IChannel).admin && (
							<div onClick={() => setLeaveModal((prev) => !prev)}>
								<ExitSvg />
							</div>
						)}
						{user.userId === (activeChat as IChannel).admin && (
							<div onClick={() => setDeleteModal((prev) => !prev)}>
								<EraseSvg />
							</div>
						)}
					</div>
				</div>
			) : (
				<div className={styles.chatsMessagesCommonInfo}>
					<div className={styles.commonInfoFirstBlock}>
						<p className={styles.chatName}>
							{user.userId === (activeChat as IDm).firstUser.userId
								? (activeChat as IDm).secondUser.name
								: (activeChat as IDm).firstUser.name}
						</p>
						{onlineUsers.includes(
							user.userId === (activeChat as IDm).firstUser.userId
								? (activeChat as IDm).secondUser.userId
								: (activeChat as IDm).firstUser.userId
						) && <span className={styles.onlineIndicator}></span>}
						{!onlineUsers.includes(
							user.userId === (activeChat as IDm).firstUser.userId
								? (activeChat as IDm).secondUser.userId
								: (activeChat as IDm).firstUser.userId
						) && <span className={styles.offlineIndicator}></span>}
						<StarSvg />
					</div>

					<div className={styles.commonInfoSecondBlock}>
						<PhoneSvg />
						<div
							onClick={() => setChatInfoStatus((prev) => !prev)}
							className={styles.additionalInfoSvg}
						>
							<span className={styles.circle}></span>
							<span className={styles.stick}></span>
						</div>
					</div>
				</div>
			)}

			{deleteModal &&
				createPortal(<DeleteModal onClose={setDeleteModal} />, document.body)}
			{leaveModal &&
				createPortal(<LeaveModal onClose={setLeaveModal} />, document.body)}
		</>
	);
}
