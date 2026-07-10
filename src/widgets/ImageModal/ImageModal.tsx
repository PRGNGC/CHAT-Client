import styles from "./ImageModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import { CrossSvg } from "@/shared/ui/CrossSvg";

interface IInviteModal {
	onClose: Dispatch<SetStateAction<boolean>>;
	fileUrl: string;
}

export function ImageModal({ onClose, fileUrl }: IInviteModal) {
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
				<img
					className={styles.img}
					src={fileUrl}
					alt="photo"
				/>
			</div>
		</div>
	);
}
