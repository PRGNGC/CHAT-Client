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
			<p className={styles.chatInfoTitle}>Details</p>
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
					About
					<TriangleSvg />
				</li>
				<li className={styles.mainFeature}>
					Members
					<TriangleSvg />
				</li>
				<li className={styles.mainFeature}>
					Shortcuts
					<TriangleSvg />
				</li>
				<li className={styles.mainFeature}>
					Pinned
					<TriangleSvg />
				</li>
				<li className={styles.mainFeature}>
					Files
					<TriangleSvg />
				</li>
			</ul>
		</div>
	);
}
