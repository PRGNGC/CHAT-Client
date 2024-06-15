import styles from "./Signup.module.scss";
import { Ellipse2 } from "@/shared/ui/Ellipse2";
import { SignupForm } from "@/widgets/SignupForm";
import { Link } from "react-router-dom";

export function Signup() {
	return (
		<div className={styles.signupPage}>
			<div className={styles.navbar}>
				<Link
					className={styles.loginLinkButton}
					to={"/login"}
				>
					Login
				</Link>
			</div>
			<SignupForm />
			<Ellipse2 />
		</div>
	);
}
