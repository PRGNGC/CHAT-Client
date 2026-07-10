import { ChatsNavigation } from "./ChatsNavigation";
import { renderWithProvidersReduxAndRouter } from "@/shared/utils/renderWithReduxAndRouter";
import { screen } from "@testing-library/dom";
import { ChannelsAccordion } from "./ui/ChannelsAccordion";
import { DmsAccordion } from "./ui/DmsAccordion";

jest.mock("./ui/ChannelsAccordion", () => ({
	...jest.requireActual("./ui/ChannelsAccordion"),
	ChannelsAccordion: jest.fn()
}));

jest.mock("./ui/DmsAccordion", () => ({
	...jest.requireActual("./ui/DmsAccordion"),
	DmsAccordion: jest.fn()
}));

describe("first", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		jest
			.mocked(ChannelsAccordion)
			.mockImplementation(() => <div>channelsAccordion</div>);

		jest.mocked(DmsAccordion).mockImplementation(() => <div>dmsAccordion</div>);
	});

	it("second", () => {
		renderWithProvidersReduxAndRouter(<ChatsNavigation />);
		expect(screen.getByAltText(/birdImg/i)).toBeInTheDocument();
	});
});
