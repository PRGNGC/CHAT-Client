import styles from "./ChatInfo.module.scss";
import { ThreeDotsSvg } from "@/shared/ui/ThreeDotsSvg";
import { SearchSvg } from "@/shared/ui/SearchSvg";
import { NewUserSvg } from "@/shared/ui/NewUserSvg";
import { PhoneSvg } from "@/shared/ui/PhoneSvg";
import { TriangleSvg } from "@/shared/ui/TriangleSvg";
import type { IChannel } from "@/entities/channel/types";
import type { IDm } from "@/entities/dm/types";
import { activeChatSelector } from "@/app/store/activeChatSlice/activeChatSlice";
import { useAppSelector } from "@/shared/utils/hooks";
import { userSelector } from "@/app/store/userSlice/userSlice";

export function ChatInfo() {
	const activeChat = useAppSelector(activeChatSelector);
	const user = useAppSelector(userSelector);

	let activeChatName = "";

	if (activeChat.type === "channel") {
		activeChatName = `#${(activeChat as IChannel).name}`;
	}

	if (activeChat.type === "dm") {
		activeChatName =
			user.name === (activeChat as IDm).firstUser.name
				? (activeChat as IDm).secondUser.name
				: (activeChat as IDm).firstUser.name;
	}

	return (
		<div className={styles.chatInfoBlock}>
			<p className={styles.chatInfoTitle}>Подробности</p>
			<p className={styles.chatName}>{activeChatName}</p>
			<div className={styles.additionalFeatures}>
				<div className={styles.additionalFeature}>
					<NewUserSvg />
				</div>
				<div className={styles.additionalFeature}>
					<SearchSvg />
				</div>
				<div className={styles.additionalFeature}>
					<PhoneSvg />
				</div>
				<div className={styles.additionalFeature}>
					<ThreeDotsSvg />
				</div>
			</div>
			<ul className={styles.mainFeatures}>
				<li className={styles.mainFeature}>
					Описание
					<TriangleSvg />
				</li>
				<li className={styles.mainFeature}>
					Участники
					<TriangleSvg />
				</li>
				<li className={styles.mainFeature}>
					Сокращения
					<TriangleSvg />
				</li>
				<li className={styles.mainFeature}>
					Закреплённые сообщения
					<TriangleSvg />
				</li>
				<li className={styles.mainFeature}>
					Файлы
					<TriangleSvg />
				</li>
			</ul>
		</div>
	);
}
