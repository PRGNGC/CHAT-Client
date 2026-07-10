import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "./LoginForm";
import { renderWithProvidersReduxAndRouter } from "@/shared/utils/renderWithReduxAndRouter";

afterEach(cleanup);

describe("check LoginForm component", () => {
	it("should render login form", () => {
		renderWithProvidersReduxAndRouter(<LoginForm />);
		const input = screen.getByText("Login");
		expect(input).toBeInTheDocument();
	});
});





