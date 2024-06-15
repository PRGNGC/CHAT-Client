import { Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import "@/app/common.scss";
import "@/shared/fonts/FaustinaItalic.ttf";
import "@/shared/fonts/FuturaBold.ttf";
import "@/shared/fonts/QuintaRegular.ttf";
import "@/shared/fonts/FuturaMedium.ttf";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<p>Home</p>}
			/>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/chat"
				element={<p>Chat</p>}
			/>
			<Route
				path="/signup"
				element={<Signup />}
			/>
		</Routes>
	);
}

// function App() {
// 	const [wholeData, setData] = useState<string[]>([]);
// 	const [inputData, setInputData] = useState<string>("");

// 	socket.on("message", (arg: string) => {
// 		setData((prev) => [...prev, arg]);
// 	});

// 	socket.on("auth", (arg: string) => {
// 		console.log("socket.on ~ arg:", arg);
// 	});

// 	function sendHandler() {
// 		socket.emit("message", inputData);
// 	}

// 	function authHandler() {
// 		socket.emit("auth", { password: "password", login: "login" });
// 	}

// 	return (
// 		<div>
// 			<input
// 				onChange={(e) => setInputData(e.target.value)}
// 				type="text"
// 			/>
// 			<button onClick={() => sendHandler()}>send</button>
// 			<button onClick={() => authHandler()}>auth</button>
// 			{/* <button onClick={(e) => setData(e.target.value)}>send</button> */}
// 			{wholeData.map((item, index) => (
// 				<p key={index}>{item}</p>
// 			))}
// 		</div>
// 	);
// }

export default App;
