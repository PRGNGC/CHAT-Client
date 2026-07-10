import { Dispatch, MouseEvent, SetStateAction } from "react";
import styles from "./CreateChannelModal.module.scss";
import { CrossSvg } from "@/shared/ui/CrossSvg";
import { useState } from "react";
import { CreateChannel } from "@/features/channel/CreateChannel";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";
import { newChannel } from "@/entities/channel/api/channelsApi";

interface ICreateChannelModal {
	onClose: Dispatch<SetStateAction<boolean>>;
}

interface Inputs {
	name: string;
	accessability: string;
	description: string;
}

export function CreateChannelModal({ onClose }: ICreateChannelModal) {
	const [name, setName] = useState<string>("");
	const [accessability, setAccessability] = useState<string>("public");
	const [description, setDescription] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>();

	const socket = useSocketContext();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const { name, accessability, description } = data;
		newChannel(socket, name, accessability, description);
		onClose(false);
	};

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
				<h3 className={styles.modalTitle}>Новая группа</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<p className={styles.categoryTitle}>Название:</p>
					<input
						className={styles.inputField}
						type="text"
						// onChange={(e) => setName(e.target.value)}
						{...register("name", { required: true })}
					/>
					{errors.name?.type === "required" && (
						<p className={styles.alert}>Поле 'Название' не заполнено</p>
					)}
					<p className={styles.categoryTitle}>Тип:</p>
					<select
						className={styles.inputSelect}
						// onChange={(e) => setAccessability(e.target.value)}
						defaultValue="public"
						{...register("accessability")}
					>
						<option value="public">public</option>
						<option value="private">private</option>
					</select>
					<p className={styles.categoryTitle}>Описание:</p>
					<textarea
						// onChange={(e) => setDescription(e.target.value)}
						className={styles.textareaField}
						{...register("description", { required: true })}
					/>
					{errors.description?.type === "required" && (
						<p className={styles.alert}>Поле 'Описание' не заполнено</p>
					)}
					<CreateChannel
						name={name}
						accessability={accessability}
						description={description}
						onClose={onClose}
					/>
				</form>
			</div>
		</div>
	);
}
