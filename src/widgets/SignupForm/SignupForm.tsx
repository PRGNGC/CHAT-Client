import styles from "./SignupForm.module.scss";
import { NewUserSvg } from "@/shared/ui/NewUserSvg";
import { useState } from "react";
import { Signup } from "@/features/session/Signup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { onSubmitLogin } from "@/features/session/Signup/Signup";

interface Inputs {
	login: string;
	password: string;
	status: string;
	name: string;
	img: File;
	uniqueID: string;
}

export function SignupForm() {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [status, setStatus] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [img, setImg] = useState<File | null>(null);
	const [uniqueID, setUniqueID] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		getValues,
		watch
	} = useForm<Inputs>();

	// const onSubmit: SubmitHandler<Inputs> = async (data) => {};

	return (
		<div className={styles.signupFormBlock}>
			<h1 className={styles.signupFormTitle}>Регистарция</h1>
			<form
				className={styles.formBlock}
				onSubmit={handleSubmit(onSubmitLogin)}
			>
				{/* <div className={styles.formBlock}> */}
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Логин</p>
					<input
						// onChange={(e) => setLogin(e.target.value)}
						className={styles.signupInput}
						type="text"
						{...register("login", { required: true })}
					/>
					{errors.login?.type === "required" && (
						<p className={styles.alert}>⚠️ Поле 'Логин' не заполнено</p>
					)}
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Пароль</p>
					<input
						// onChange={(e) => setPassword(e.target.value)}
						className={styles.signupInput}
						type="text"
						{...register("password", { required: true })}
					/>
					{errors.password?.type === "required" && (
						<p className={styles.alert}>⚠️ Поле 'Пароль' не заполнено</p>
					)}
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Статус</p>
					<input
						// onChange={(e) => setStatus(e.target.value)}
						className={styles.signupInput}
						type="text"
						{...register("status", { required: true })}
					/>
					{errors.status?.type === "required" && (
						<p className={styles.alert}>⚠️ Поле 'Статус' не заполнено</p>
					)}
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Имя</p>
					<input
						// onChange={(e) => setName(e.target.value)}
						className={styles.signupInput}
						type="text"
						{...register("name", { required: true })}
					/>
					{errors.name?.type === "required" && (
						<p className={styles.alert}>⚠️ Поле 'Имя' не заполнено</p>
					)}
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>
						Уникальный идентификационный номер
					</p>
					<input
						// onChange={(e) => setUniqueID(e.target.value)}
						className={styles.signupInput}
						type="text"
						{...register("uniqueID", { required: true })}
					/>
					{errors.uniqueID?.type === "required" && (
						<p className={styles.alert}>
							⚠️ Поле 'Уникальный идентификационный номер' не заполнено
						</p>
					)}
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Фотография</p>
					<div className={styles.imageBlock}>
						<NewUserSvg />
						{/* {getValues("img")?.["0"] && ( */}
						{watch("img")?.["0"] && (
							<img
								src={window.URL.createObjectURL(watch("img")?.["0"])}
								loading="lazy"
								width={120}
								height={120}
								alt="img"
							/>
						)}
						<input
							className={styles.signupInputFile}
							type="file"
							// onChange={(e) => {
							// 	if (e.target.files !== null && e.target.files.length >= 1) {
							// 		setImg(e.target.files[0]);
							// 	}
							// }}
							{...register("img", { required: true })}
						/>
					</div>
					{errors.img?.type === "required" && (
						<p className={styles.alert}>⚠️ Поле 'Фотография' не заполнено</p>
					)}
				</div>
				<Signup
					login={login}
					password={password}
					status={status}
					name={name}
					img={img as File}
					uniqueID={uniqueID}
				/>
				{/* </div> */}
			</form>
		</div>
	);
}
