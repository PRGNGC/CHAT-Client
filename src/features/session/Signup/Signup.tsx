import styles from "./Signup.module.scss";
import { signupApi } from "@/entities/session";
import { loginUser } from "@/app/store/userSlice/userSlice";
import { setAccessToken } from "@/app/store/sessionSlice/sessionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";

interface ISignup {
	login: string;
	password: string;
	status: string;
	name: string;
	img: File;
}

export function Signup({ login, password, status, name, img }: ISignup) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function signupHandler() {
		const response = await signupApi(login, password, status, name, img);
		if (response.status === 201) {
			dispatch(loginUser({ user: response.payload.user }));
			dispatch(setAccessToken({ accessToken: response.payload.accessToken }));
			if (response.payload.user.channels[0]) {
				dispatch(
					setActiveChat({ activeChat: response.payload.user.channels[0] })
				);
			}
			navigate("/");
		}
	}

	return (
		<button
			onClick={signupHandler}
			className={styles.signupButton}
		>
			Sign up
		</button>
	);
}
