import styles from "./LoginForm.module.scss";
import { useState } from "react";
import { Login } from "@/features/session/Login";
import { BlackEye } from "@/shared/ui/BlackEye";
import { useForm, type SubmitHandler } from "react-hook-form";
import { onSubmitLogin } from "@/features/session/Login/Login";
// import { onSubmitLogin } from "@/entities/session/queries";

interface Inputs {
	login: string;
	password: string;
}

export function LoginForm() {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [viewPassword, setViewPassword] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<Inputs>();

	// const onSubmit: SubmitHandler<Inputs> = async (data) => {};

	return (
		<div className={styles.loginFormBlock}>
			<h1 className={styles.loginFormTitle}>Авторизация</h1>
			<form
				className={styles.formBlock}
				onSubmit={handleSubmit(onSubmitLogin)}
			>
				{/* <div className={styles.formBlock}> */}
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Логин:</p>
					<input
						// onChange={(e) => setLogin(e.target.value)}
						// autoComplete="off"
						className={styles.loginInput}
						type="text"
						data-testid="1"
						{...register("login", { required: true })}
					/>
					{errors.login?.type === "required" && (
						<p className={styles.alert}>⚠️ Поле 'Логин' не заполнено</p>
					)}
					{/* {errors.login?.type === "custom" && (
						<p className={styles.alert}>{errors.login.message}</p>
					)} */}
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Пароль:</p>
					<div className={styles.passwordField}>
						<input
							// onChange={(e) => setPassword(e.target.value)}
							// autoComplete="off"
							className={styles.loginInput}
							type={viewPassword === false ? "password" : "text"}
							{...register("password", { required: true })}
						/>
						<p
							onClick={() => setViewPassword((prev) => !prev)}
							style={{ marginRight: "5px" }}
						>
							<BlackEye />
						</p>
					</div>
					{errors.password?.type === "required" && (
						<p className={styles.alert}>⚠️ Поле 'Пароль' не заполнено</p>
					)}
				</div>
				{errors.login?.type === "custom" && (
					<p className={styles.alert}>⚠️ {errors.login.message}</p>
				)}
				<Login
					// login={login}
					// password={password}
					seterror={setError}
				/>
				{/* </div> */}
			</form>
		</div>
	);
}
