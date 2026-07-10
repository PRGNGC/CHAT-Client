import { Dispatch, SetStateAction } from "react";
import styles from "./LeaveModal.module.scss";
import { CrossSvg } from "@/shared/ui/CrossSvg";
import { LeaveChannel } from "@/features/channel/LeaveChannel";

interface ILeaveModal {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function LeaveModal({ onClose }: ILeaveModal) {
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
					Вы уверены, что хотите покинуть этот чат?
				</p>
				<LeaveChannel />
			</div>
		</div>
	);
}

// специальный синтаксис для того, чтобы не устанавливать активный чат
// dispatch(setActiveChat({ activeChat: {} as IChannel }));
