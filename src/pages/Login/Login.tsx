import styles from "./Login.module.scss";
import { Ellipse1 } from "@/shared/ui/Ellipse1";
import { LoginForm } from "@/widgets/LoginForm";
import { Link } from "react-router-dom";
// import photo from "../../../../CHAT-Server/public/avatar-5.png"

export function Login() {
	// новый формат для картинки
	const str = "http://localhost:3500/audits-1.jpg";
	return (
		<div className={styles.loginPage}>
			<div className={styles.navbar}>
				<Link
					className={styles.signupLinkButton}
					to={"/signup"}
					data-testid="signup-pass"
				>
					Регистрация
				</Link>
			</div>
			<LoginForm />
			<Ellipse1 />
		</div>
	);
}
