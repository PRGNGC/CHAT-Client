import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface IProtectedMiddleware {
	children: ReactNode;
}

export function ProtectedMiddleware({ children }: IProtectedMiddleware) {
	const accessToken = useSelector(
		(state: RootState) => state.session.accessToken
	);

	if (accessToken === "") {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return children;
}
