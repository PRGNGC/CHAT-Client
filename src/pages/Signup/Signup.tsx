import styles from "./Signup.module.scss";
import { Ellipse2 } from "@/shared/ui/Ellipse2";
import { Ellipse1 } from "@/shared/ui/Ellipse1";
import { Ellipse3 } from "@/shared/ui/Ellipse3";
import { Ellipse4 } from "@/shared/ui/Ellipse4";
import { SignupForm } from "@/widgets/SignupForm";
import { Link } from "react-router-dom";

export function Signup() {
	return (
		<div
			data-testid="signup-page"
			className={styles.signupPage}
		>
			<div className={styles.navbar}>
				<Link
					className={styles.loginLinkButton}
					to={"/login"}
					data-testid="login-pass"
				>
					Логин
				</Link>
			</div>
			<SignupForm />
			{/* <Ellipse2 /> */}
			<Ellipse1 />
			{/* <Ellipse3 /> */}
			{/* <Ellipse4 /> */}
		</div>
	);
}
