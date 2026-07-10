import { cleanup, render, screen } from "@testing-library/react";
import { Check } from "./Check";

afterEach(cleanup);

describe("mock", () => {
	test.skip("mock", () => {
		render(<Check />);
		const element = screen.getByTestId("");
		expect(element).toBeInTheDocument;
	});
});
