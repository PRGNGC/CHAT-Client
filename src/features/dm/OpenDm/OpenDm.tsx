import styles from "./OpenDm.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/utils/hooks";
import { dmSelector } from "@/app/store/userSlice/userSlice";
import { IUser } from "@/entities/user/types";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { useTogglersHandler } from "@/app/contextProviders/useTogglers";
import { toggleShowChat } from "@/app/store/togglersSlice/togglersSlice";

interface IOpenDm {
	existingDm: IUser;
}

export function OpenDm({ existingDm }: IOpenDm) {
	const dispatch = useAppDispatch();
	const dmsOfUser = useAppSelector(dmSelector);
	// const setShowChat = useTogglersHandler((v) => v.setShowChat);

	function openHandler() {
		const newActiveChat = dmsOfUser.filter(
			(chat) =>
				existingDm.userId === chat.firstUser.userId ||
				existingDm.userId === chat.secondUser.userId
		);
		dispatch(setActiveChat({ activeChat: newActiveChat[0] }));
		dispatch(toggleShowChat());
		// setShowChat(true);
	}

	return (
		<button
			onClick={openHandler}
			className={styles.goToDmBtn}
		>
			Перейти
		</button>
	);
}
