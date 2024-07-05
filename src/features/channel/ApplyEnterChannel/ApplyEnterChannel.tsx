import styles from "./ApplyEnterChannel.module.scss";
import { applyEnter } from "@/entities/channel/api/channelsApi";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { IChannel } from "@/entities/channel/types";
import { useAppSelector } from "@/shared/utils/hooks";
import { userSelector } from "@/app/store/userSlice/userSlice";

interface IApplyEnterChannel {
	channelToApply: IChannel;
}

export function ApplyEnterChannel({ channelToApply }: IApplyEnterChannel) {
	const socket = useSocketContext();
	const user = useAppSelector(userSelector);

	function applyEnterHandler() {
		applyEnter(socket, user, channelToApply);
	}

	return (
		<button
			onClick={applyEnterHandler}
			className={styles.applyEnterBtn}
		>
			Apply
		</button>
	);
}
