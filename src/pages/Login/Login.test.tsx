import { render, fireEvent, screen } from "@testing-library/react";
import { Login } from "./Login";
import "@testing-library/jest-dom";
import { renderWithProvidersReduxAndRouter } from "@/shared/utils/renderWithReduxAndRouter";
import userEvent from "@testing-library/user-event";

describe("check LoginForm component", () => {
	test.skip("should render login form", () => {
		renderWithProvidersReduxAndRouter(<Login />);

		// const field = screen.getByTestId("test");
		// const fieldHandler = screen.getByTestId("testClick");
		// fireEvent.click(fieldHandler);
		// expect(field).toHaveTextContent("1");

		// fireEvent.click(screen.getByTestId("toggleButton"));
		userEvent.click(screen.getByTestId("toggleButton"));
		expect(screen.queryByTestId("toggleButton")).not.toBeInTheDocument();
	});
});
