import styles from "./UserInfo.module.scss";
import { SmileSvg } from "@/shared/ui/SmileSvg";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { useAppSelector } from "@/shared/utils/hooks";

export function UserInfo() {
	const user = useAppSelector(userSelector);

	return (
		<div className={styles.userInfoBlock}>
			<div className={styles.userInfoCredentials}>
				<img
					// src={`data:image/png;base64, ${user.userImg}`}
					src={user.userImg}
					alt="img"
					width={60}
					height={60}
					className={styles.userInfoImg}
				/>
				<p className={styles.userInfoName}>{user.name}</p>
			</div>

			<div className={styles.updateStatusBlock}>
				<SmileSvg />
				Update status
			</div>

			<ul className={styles.activitySettings}>
				<li className={styles.onlineStatus}>Set yourself as away</li>
				<li className={styles.notificationsStatus}>Pause notifications</li>
			</ul>
			<ul className={styles.profileSettings}>
				<li className={styles.editProfile}>Edit profile</li>
				<li className={styles.viewProfile}>View profile</li>
				<li className={styles.preferences}>Preferences</li>
			</ul>
			<ul className={styles.downloads}>
				<li className={styles.download}>Downloads</li>
			</ul>
		</div>
	);
}
