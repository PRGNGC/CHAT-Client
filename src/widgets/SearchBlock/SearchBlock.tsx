import styles from "./SearchBlock.module.scss";
import { useState } from "react";
import { ChannelContainer } from "./ui/ChannelContainer";
import { DmsContainer } from "./ui/DmsContainer";

export function SearchBlock() {
	const [currentCategory, setCurrentCategory] = useState<number>(1);

	return (
		<div className={styles.searchBlock}>
			<div className={styles.categoryBlock}>
				<div
					onClick={() => setCurrentCategory(1)}
					className={
						currentCategory === 1 ? styles.activeCategory : styles.category
					}
				>
					Channels
				</div>
				<div
					onClick={() => setCurrentCategory(2)}
					className={
						currentCategory === 2 ? styles.activeCategory : styles.category
					}
				>
					DMs
				</div>
			</div>
			{currentCategory === 1 && <ChannelContainer />}
			{currentCategory === 2 && <DmsContainer />}
		</div>
	);
}
