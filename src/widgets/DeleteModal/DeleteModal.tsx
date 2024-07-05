import { Dispatch, SetStateAction } from "react";
import styles from "./DeleteModal.module.scss";
import { CrossSvg } from "@/shared/ui/CrossSvg";
import { DeleteChannel } from "@/features/channel/DeleteChannel";

interface IDeleteModal {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function DeleteModal({ onClose }: IDeleteModal) {
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
					Are you sure you want delete this channel? All messages will be lost
				</p>
				<DeleteChannel />
			</div>
		</div>
	);
}
