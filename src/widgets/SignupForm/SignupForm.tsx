import styles from "./SignupForm.module.scss";
import { NewUserSvg } from "@/shared/ui/NewUserSvg";
import { useState } from "react";
import { Signup } from "@/features/session/Signup";

export function SignupForm() {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [status, setStatus] = useState<string>("");
	const [img, setImg] = useState<File | null>(null);

	return (
		<div className={styles.signupFormBlock}>
			<h1 className={styles.signupFormTitle}>Registration</h1>
			<div className={styles.formBlock}>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Login</p>
					<input
						onChange={(e) => setLogin(e.target.value)}
						className={styles.signupInput}
						type="text"
					/>
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Password</p>
					<input
						onChange={(e) => setPassword(e.target.value)}
						className={styles.signupInput}
						type="text"
					/>
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Status</p>
					<input
						onChange={(e) => setStatus(e.target.value)}
						className={styles.signupInput}
						type="text"
					/>
				</div>
				<div className={styles.inputBlock}>
					<p className={styles.inputBlockTitle}>Image</p>
					<div className={styles.imageBlock}>
						<NewUserSvg />
						{img && (
							<img
								src={window.URL.createObjectURL(img)}
								loading="lazy"
								width={120}
								height={120}
								alt="img"
							/>
						)}
						<input
							className={styles.signupInputFile}
							type="file"
							onChange={(e) => {
								if (e.target.files !== null && e.target.files.length >= 1) {
									setImg(e.target.files[0]);
								}
							}}
						/>
					</div>
				</div>
				<Signup
					login={login}
					password={password}
					status={status}
					img={img as File}
				/>
			</div>
		</div>
	);
}
