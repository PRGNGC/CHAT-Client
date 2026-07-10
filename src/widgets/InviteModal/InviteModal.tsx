import { Dispatch, SetStateAction } from "react";
import styles from "./InviteModal.module.scss";
import { CrossSvg } from "@/shared/ui/CrossSvg";

interface IInviteModal {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function InviteModal({ onClose }: IInviteModal) {
	return (
		<div
			onClick={() => onClose(false)}
			className={styles.modalContainer}
		>
			<div className={styles.modalWindow}>
				<span
					onClick={() => onClose(false)}
					className={styles.closeBtn}
				>
					<CrossSvg />
				</span>
				<p className={styles.warningMessage}>
					Are you sure you want leave this channel?
				</p>
			</div>
		</div>
	);
}
