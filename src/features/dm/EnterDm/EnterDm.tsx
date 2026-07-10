import { useAppSelector } from "@/shared/utils/hooks";
import styles from "./EnterDm.module.scss";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { IUser } from "@/entities/user/types";
import { useTogglersHandler } from "@/app/contextProviders/useTogglers";
import { useAppDispatch } from "@/shared/utils/hooks";
import { toggleShowChat } from "@/app/store/togglersSlice/togglersSlice";

interface IEnterDm {
	newDm: IUser;
}

export function EnterDm({ newDm }: IEnterDm) {
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);
	const dispatch = useAppDispatch();
	// const setShowChat = useTogglersHandler((v) => v.setShowChat);

	function enterHandler() {
		console.log("here");
		console.log("enterHandler ~ user:", user);
		console.log("enterHandler ~ newDm:", newDm);
		socket.emit("enter dm", {
			initiatorUser: {
				name: user.name,
				userId: user.userId,
				userImg: user.userImg
			},
			secondUser: {
				name: newDm.name,
				userId: newDm.userId,
				userImg: newDm.userImg
			}
			// roomClient: "",
			// firstUser: ""
		});
		dispatch(toggleShowChat());
		// setShowChat(true);
	}

	return (
		<button
			onClick={enterHandler}
			className={styles.writeBtn}
		>
			Написать
		</button>
	);
}
