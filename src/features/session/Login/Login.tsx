import styles from "./Login.module.scss";

interface ILogin {
	login: string;
	password: string;
}

export function Login({ login, password }: ILogin) {
	console.log("Login ~ login, password:", login, password);
	return (
		<button
			onClick={() => console.log("Login")}
			className={styles.loginButton}
		>
			Log in
		</button>
	);
}
