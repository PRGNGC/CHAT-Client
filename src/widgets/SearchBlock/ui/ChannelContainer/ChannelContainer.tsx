import styles from "./ChannelContainer.module.scss";
import { loadChannels } from "@/entities/channel";
import { IChannel } from "@/entities/channel/types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { channelSelector } from "@/app/store/userSlice/userSlice";
import { useAppSelector } from "@/shared/utils/hooks";
import { OpenChannel } from "@/features/channel/OpenChannel";
import { ApplyEnterChannel } from "@/features/channel/ApplyEnterChannel";
import { EnterChannel } from "@/features/channel/EnterChannel";
import { InviteChannel } from "@/features/channel/InviteChannel";
import { Loader } from "@/shared/ui/Loader/Loader";

export function ChannelContainer() {
	const [page, setPage] = useState(1);
	const [searchParams, _] = useSearchParams();
	const channelsOfUser = useAppSelector(channelSelector);

	const { isLoading, isError, data, error, isPlaceholderData } = loadChannels(
		page,
		searchParams.get("search") as string
	);

	// if (isLoading) {
	// 	return <Loader />;
	// 	// return <p>Loading...</p>;
	// }

	if (isError) {
		return <p>{error.name}</p>;
	}

	return (
		<div className={styles.channelsContainerBlock}>
			{isLoading && (
				<div className={styles.loaderContainer}>
					<Loader />
				</div>
			)}
			{!isLoading && (
				<>
					<div className={styles.channelsList}>
						{data.channels.map((channel: IChannel) => {
							const userHasChannel = channelsOfUser.some(
								(channelOfUser) => channelOfUser.id === channel.id
							);
							return (
								<div
									className={styles.channelBlock}
									key={crypto.randomUUID()}
								>
									<p className={styles.channel}>#{channel.name}</p>
									{userHasChannel && <OpenChannel existingChannel={channel} />}
									{!userHasChannel && channel.availability === "private" && (
										<ApplyEnterChannel channelToApply={channel} />
									)}
									{!userHasChannel && channel.availability === "public" && (
										<EnterChannel newChannel={channel} />
									)}
								</div>
							);
						})}
					</div>
					<div className={styles.buttonsBlock}>
						<button
							className={styles.prevPageBtn}
							onClick={() =>
								setPage((prev) => {
									return prev === 1 ? 1 : prev - 1;
								})
							}
							disabled={isPlaceholderData}
						>
							Пред.
						</button>
						<button
							className={styles.nextPageBtn}
							onClick={() => setPage((prev) => prev + 1)}
							disabled={isPlaceholderData || !data.hasMore}
						>
							След.
						</button>
					</div>
				</>
			)}
		</div>
	);
}
