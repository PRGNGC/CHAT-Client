import styles from "./Toggler.module.scss";
import { useState } from "react";

export function Toggler() {
	const [roundPosition, setRoundPosition] = useState<number>(6);

	return (
		<div
			onClick={() => {
				setRoundPosition((prev) => (prev === 6 ? 50 : 6));
			}}
			className={styles.mainBlockToggler}
		>
			<div className={styles.toggler}>
				<div
					style={{ left: `${roundPosition}%` }}
					className={styles.togglerRound}
				></div>
			</div>
			<p className={styles.togglerText}>Search channels / users</p>
		</div>
	);
}
