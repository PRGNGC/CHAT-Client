import styles from "./Signup.module.scss";

interface ISignup {
	login: string;
	password: string;
	status: string;
	img: File;
}

export function Signup({ login, password, status, img }: ISignup) {
	console.log(
		"Signup ~ login, password, status, img:",
		login,
		password,
		status,
		img
	);
	return (
		<button
			onClick={() => console.log("Signup")}
			className={styles.signupButton}
		>
			Sign up
		</button>
	);
}
