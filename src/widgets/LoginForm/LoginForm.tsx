import styles from "./LoginForm.module.scss";
import { useState } from "react";
import { Login } from "@/features/session/Login";

export function LoginForm() {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<div className={styles.loginFormBlock}>
			<h1 className={styles.loginFormTitle}>Authentication</h1>
			<div className={styles.formBlock}>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Login</p>
					<input
						onChange={(e) => setLogin(e.target.value)}
						className={styles.loginInput}
						type="text"
					/>
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Password</p>
					<input
						onChange={(e) => setPassword(e.target.value)}
						className={styles.loginInput}
						type="text"
					/>
				</div>
				{/* <button
					onClick={() => console.log("Login")}
					className={styles.loginButton}
				>
					Log in
				</button> */}
				<Login
					login={login}
					password={password}
				/>
			</div>
		</div>
	);
}
