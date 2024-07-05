import { Dispatch, MouseEvent, SetStateAction } from "react";
import styles from "./CreateChannelModal.module.scss";
import { CrossSvg } from "@/shared/ui/CrossSvg";
import { useState } from "react";
import { CreateChannel } from "@/features/channel/CreateChannel";

interface ICreateChannelModal {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function CreateChannelModal({ onClose }: ICreateChannelModal) {
	const [name, setName] = useState<string>("");
	const [accessability, setAccessability] = useState<string>("public");
	const [description, setDescription] = useState<string>("");

	function closeModalHandler(e: MouseEvent<HTMLDivElement>) {
		const target = e.target as HTMLDivElement;
		if (target.id === "container" || target.id === "cross") {
			onClose(false);
		}
	}

	return (
		<div
			onClick={closeModalHandler}
			className={styles.modalContainer}
			id="container"
		>
			<div className={styles.modalWindow}>
				<span
					id="cross"
					onClick={closeModalHandler}
					className={styles.closeBtn}
				>
					<CrossSvg />
				</span>
				<h3 className={styles.modalTitle}>Create new channel</h3>
				<p className={styles.categoryTitle}>Name</p>
				<input
					className={styles.inputField}
					type="text"
					onChange={(e) => setName(e.target.value)}
				/>
				<p className={styles.categoryTitle}>Accessability</p>
				<select
					className={styles.inputSelect}
					onChange={(e) => setAccessability(e.target.value)}
				>
					<option value="public">public</option>
					<option value="private">private</option>
				</select>
				<p className={styles.categoryTitle}>Description</p>
				<textarea
					onChange={(e) => setDescription(e.target.value)}
					className={styles.textareaField}
				/>
				<CreateChannel
					name={name}
					accessability={accessability}
					description={description}
					onClose={onClose}
				/>
			</div>
		</div>
	);
}
