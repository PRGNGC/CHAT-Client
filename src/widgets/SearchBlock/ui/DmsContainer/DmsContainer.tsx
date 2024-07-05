import styles from "./DmsContainer.module.scss";
import { loadDms } from "@/entities/dm";
import { IUser } from "@/entities/user/types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { userSelector } from "@/app/store/userSlice/userSlice";
import { useAppSelector } from "@/shared/utils/hooks";
import { OpenDm } from "@/features/dm/OpenDm";
import { EnterDm } from "@/features/dm/EnterDm";

export function DmsContainer() {
	const [page, setPage] = useState(1);
	const [searchParams, _] = useSearchParams();
	const user = useAppSelector(userSelector);
	const opponentsOfUser = user.dms.map((dm) => {
		return user.userId === dm.firstUser.userId
			? dm.secondUser.userId
			: dm.firstUser.userId;
	});

	const { isLoading, isError, data, error, isPlaceholderData } = loadDms(
		page,
		searchParams.get("search") as string
	);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>{error.name}</p>;
	}

	return (
		<div className={styles.dmsContainerBlock}>
			<div className={styles.dmsList}>
				{data.dms.map((dm: IUser) => {
					if (dm.userId === user.userId) return null;
					const userHasDm = opponentsOfUser.includes(dm.userId);
					return (
						<div
							key={crypto.randomUUID()}
							className={styles.dmBlock}
						>
							<div className={styles.dmCommonInfo}>
								<img
									className={styles.dmImg}
									src={dm.userImg}
									alt="img"
									width={60}
									height={60}
								/>
								<p className={styles.dmName}>{dm.name}</p>
							</div>
							{userHasDm && <OpenDm existingDm={dm} />}
							{!userHasDm && <EnterDm newDm={dm} />}
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
					Prev
				</button>
				<button
					className={styles.nextPageBtn}
					onClick={() => setPage((prev) => prev + 1)}
					disabled={isPlaceholderData || !data.hasMore}
				>
					Next
				</button>
			</div>
		</div>
	);
}
