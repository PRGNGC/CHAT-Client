import styles from "./Navbar.module.scss";
import { Logout } from "@/features/session/Logout";
import { Notification } from "@/widgets/Notification";
import { Search } from "@/features/message/Search";
import { Toggler } from "@/shared/ui/Toggler";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { useAppSelector } from "@/shared/utils/hooks";
import { useTogglersHandler } from "@/app/contextProviders/useTogglers";

export function Navbar() {
	const user = useAppSelector(userSelector);
	const setUserInfoStatus = useTogglersHandler((v) => v.setUserInfoStatus);
	const setShowChat = useTogglersHandler((v) => v.setShowChat);

	return (
		<div className={styles.navbarBlock}>
			<div onClick={() => setShowChat((prev) => !prev)}>
				<Toggler />
			</div>
			<Search />
			<div className={styles.navigationBlock}>
				<Notification />
				<div
					className={styles.userAvatarBlock}
					onClick={() => setUserInfoStatus((prev) => !prev)}
				>
					<img
						className={styles.userAvatar}
						// src={`data:image/png;base64, ${user.userImg}`}
						src={user.userImg}
						alt="img"
						width={60}
						height={60}
					/>
				</div>
				<Logout />
			</div>
		</div>
	);
}
