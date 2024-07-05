import { Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { Chat } from "@/pages/Chat";
import { ProtectedMiddleware } from "./ProtectedMiddleware";
import "@/app/common.scss";
import "@/shared/fonts/FaustinaItalic.ttf";
import "@/shared/fonts/FuturaBold.ttf";
import "@/shared/fonts/QuintaRegular.ttf";
import "@/shared/fonts/FuturaMedium.ttf";
import { TogglersProvider } from "./contextProviders/togglersProvider";

function App() {
	return (
		<Routes>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/"
				element={
					<ProtectedMiddleware>
						<TogglersProvider>
							<Chat />
						</TogglersProvider>
					</ProtectedMiddleware>
				}
			/>
			<Route
				path="/signup"
				element={<Signup />}
			/>
		</Routes>
	);
}

export default App;
