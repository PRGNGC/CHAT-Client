import styles from "./Toggler.module.scss";
import { useState } from "react";
import { togglersSelector } from "@/app/store/togglersSlice/togglersSlice";
import { toggleShowChat } from "@/app/store/togglersSlice/togglersSlice";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";

// первые три строчки комментариев - это логика управления переключателем локально, а не через redux

export function Toggler() {
	// const [roundPosition, setRoundPosition] = useState<number>(6);
	const dispatch = useAppDispatch();
	const showChatStatus = useAppSelector(togglersSelector);
	console.log(showChatStatus.showChat);

	return (
		<div
			onClick={() => {
				// setRoundPosition((prev) => (prev === 6 ? 50 : 6));
				dispatch(toggleShowChat());
			}}
			className={styles.mainBlockToggler}
		>
			<div className={styles.toggler}>
				<div
					// style={{ left: `${roundPosition}%` }}
					style={{ left: `${showChatStatus.showChat ? 6 : 50}%` }}
					className={styles.togglerRound}
				></div>
			</div>
			{/* <p className={styles.togglerText}>Search channels / users</p> */}
			<p className={styles.togglerText}>Поиск групп/ЛС</p>
		</div>
	);
}

// специальный синтаксис для того, чтобы не устанавливать активный чат
// dispatch(setActiveChat({ activeChat: {} as IChannel }));
