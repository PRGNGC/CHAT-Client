import styles from "./Signup.module.scss";
import { signupApi } from "@/entities/session";
import { loginUser } from "@/app/store/userSlice/userSlice";
import { setAccessToken } from "@/app/store/sessionSlice/sessionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveChat } from "@/app/store/activeChatSlice/activeChatSlice";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { Loader } from "@/shared/ui/Loader/Loader";

interface ISignup {
	login: string;
	password: string;
	status: string;
	name: string;
	img: File;
	uniqueID: string;
}

interface Inputs {
	login: string;
	password: string;
	status: string;
	name: string;
	img: File;
	uniqueID: string;
}

export let onSubmitLogin: SubmitHandler<Inputs>;

export function Signup({
	login,
	password,
	status,
	name,
	img,
	uniqueID
}: ISignup) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// async function signupHandler() {
	onSubmitLogin = async function (data) {
		const { login, password, status, name, uniqueID } = data;
		const img = data.img[0];
		setLoading(true);

		const response = await signupApi(
			login,
			password,
			status,
			name,
			img,
			uniqueID
		);
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
	};

	return (
		<button
			type="submit"
			// onClick={signupHandler}
			className={styles.signupButton}
		>
			{loading && <Loader />}
			{!loading && "Зарегистрироваться"}
		</button>
	);
}
