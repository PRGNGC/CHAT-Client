import { useAppSelector } from "@/shared/utils/hooks";
import styles from "./EnterDm.module.scss";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { IUser } from "@/entities/user/types";
import { useTogglersHandler } from "@/app/contextProviders/useTogglers";

interface IEnterDm {
	newDm: IUser;
}

export function EnterDm({ newDm }: IEnterDm) {
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);
	const setShowChat = useTogglersHandler((v) => v.setShowChat);

	function enterHandler() {
		console.log("here");
		console.log("enterHandler ~ user:", user);
		console.log("enterHandler ~ newDm:", newDm);
		socket.emit("enter dm", {
			iniciatorUser: {
				name: user.name,
				userId: user.userId,
				userImg: user.userImg
			},
			secondUser: {
				name: newDm.name,
				userId: newDm.userId,
				userImg: newDm.userImg
			}
		});
		setShowChat(true);
	}

	return (
		<button
			onClick={enterHandler}
			className={styles.writeBtn}
		>
			Write
		</button>
	);
}
