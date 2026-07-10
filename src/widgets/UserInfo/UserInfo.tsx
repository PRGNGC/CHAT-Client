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
				Обновить статус
			</div>

			<ul className={styles.activitySettings}>
				<li className={styles.onlineStatus}>Установить статус "оффлайн"</li>
				<li className={styles.notificationsStatus}>
					Приостановить уведомления
				</li>
			</ul>
			<ul className={styles.profileSettings}>
				<li className={styles.editProfile}>Редактировать профиль</li>
				<li className={styles.viewProfile}>Просмотреть профиль</li>
				<li className={styles.preferences}>Предпочтения</li>
			</ul>
			<ul className={styles.downloads}>
				<li className={styles.download}>Загрузки</li>
			</ul>
		</div>
	);
}
