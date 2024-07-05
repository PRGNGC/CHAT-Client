import { PlusSvg } from "@/shared/ui/PlusSvg";
import styles from "./ChatsNavigation.module.scss";
import { MessageSvg } from "@/shared/ui/MessageSvg";
import { useState } from "react";
import { createPortal } from "react-dom";
import { CreateChannelModal } from "../CreateChannelModal";
import { ChannelsAccordion } from "./ui/ChannelsAccordion";
import { DmsAccordion } from "./ui/DmsAccordion";

export function ChatsNavigation() {
	const [createChannelModal, setCreateChannelModal] = useState<boolean>(false);

	return (
		<div className={styles.chatsNavigationBlock}>
			<div className={styles.chatLogoBlock}>
				<img
					src={"/images/dove.png"}
					alt="img"
					width={55}
					height={38}
				/>
				<p className={styles.logoTitle}>DOVE</p>
			</div>
			<div className={styles.chatsTitleBlock}>
				<MessageSvg />
				<p className={styles.chatsTitle}>Threads</p>
			</div>
			<div className={styles.accordions}>
				<ChannelsAccordion />
				<DmsAccordion />
				<button
					onClick={() => setCreateChannelModal(true)}
					className={styles.addButton}
				>
					<PlusSvg /> Add
				</button>
			</div>
			{createChannelModal &&
				createPortal(
					<CreateChannelModal onClose={setCreateChannelModal} />,
					document.body
				)}
		</div>
	);
}
