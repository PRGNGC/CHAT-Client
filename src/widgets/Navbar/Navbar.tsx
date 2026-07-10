import styles from "./Navbar.module.scss";
import { Logout } from "@/features/session/Logout";
import { Notification } from "@/widgets/Notification";
import { Search } from "@/features/message/Search";
import { Toggler } from "@/shared/ui/Toggler";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { useAppSelector } from "@/shared/utils/hooks";
import { useDispatch } from "react-redux";
import { toggleUserInfoStatus } from "@/app/store/togglersSlice/togglersSlice";

export function Navbar() {
	const dispatch = useDispatch();
	const user = useAppSelector(userSelector);

	return (
		<div className={styles.navbarBlock}>
			<div>
				<Toggler />
			</div>
			{/* <Search /> */}
			<div className={styles.navigationBlock}>
				<Notification />
				{/* <p className={styles.userName}>{user.name}</p> */}
				<div
					className={styles.userAvatarBlock}
					onClick={() => dispatch(toggleUserInfoStatus())}
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
