import styles from "./Login.module.scss";
import { Ellipse1 } from "@/shared/ui/Ellipse1";
import { LoginForm } from "@/widgets/LoginForm";
import { Link } from "react-router-dom";

export function Login() {
	return (
		<div className={styles.loginPage}>
			<div className={styles.navbar}>
				<Link
					className={styles.signupLinkButton}
					to={"/signup"}
				>
					Sign up
				</Link>
			</div>
			<LoginForm />
			<Ellipse1 />
		</div>
	);
}
