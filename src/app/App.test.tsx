import { screen, waitFor, logRoles } from "@testing-library/react";
import App from "./App";
import { renderWithProvidersReduxAndRouter } from "@/shared/utils/renderWithReduxAndRouter";
import userEvent from "@testing-library/user-event";
import { RootState, store } from "./store/store";
import { enableFetchMocks } from "jest-fetch-mock";
import fetchMock from "jest-fetch-mock";
import { useAppSelector } from "@/shared/utils/hooks";
import { IMessage } from "@/entities/message/types";
import { IUser } from "@/entities/user/types";
import { IChannel } from "@/entities/channel/types";
import { IDm } from "@/entities/dm/types";
import {
	IApplyRequest,
	IApplyResponse,
	IChannelDeletion,
	IInvitation,
	IMention,
	IUnreadMessage
} from "@/entities/notification/types";

enableFetchMocks();

const mockChannels = [
	{
		id: "1",
		type: "channel",
		messages: [],
		name: "Jhon",
		participants: [],
		availability: "private",
		admin: "user1"
	},
	{
		id: "2",
		type: "channel",
		messages: [],
		name: "Mary",
		participants: [],
		availability: "private",
		admin: "user2"
	}
];

jest.mock("@/shared/utils/hooks", () => ({
	...jest.requireActual("@/shared/utils/hooks"),
	useAppSelector: jest.fn()
}));

describe("navigation on site", () => {
	beforeEach(() => {
		const currentState: RootState = {
			session: {
				accessToken: "12"
			},
			activeChat: {
				activeChat: {
					id: "1",
					type: "channel",
					messages: [] as IMessage[],
					participants: [] as IUser[],
					availability: "private",
					admin: "user1",
					name: "name"
				}
			},
			channels: {
				channels: mockChannels
			},
			dms: {
				dms: [
					{
						id: "string",
						type: "string",
						messages: [] as IMessage[],
						firstUser: {} as IUser,
						secondUser: {} as IUser
					}
				]
			},
			notification: {
				unreadMessages: [] as IUnreadMessage[],
				invitations: [] as IInvitation[],
				mentions: [] as IMention[],
				applyRequests: [] as IApplyRequest[],
				channelDeletion: [] as IChannelDeletion[],
				applyResponses: [] as IApplyResponse[]
			},
			typing: ["1"],
			onlineUser: ["1"],
			user: {
				user: {
					name: "string",
					userId: "string",
					userImg: "string",
					status: "string",
					dms: [] as IDm[],
					channels: [
						{
							id: "1",
							type: "channel",
							messages: [] as IMessage[],
							participants: [] as IUser[],
							availability: "private",
							admin: "user1"
						}
					] as IChannel[]
				}
			}
		} as RootState;
		jest.clearAllMocks();
		jest.mocked(useAppSelector).mockImplementation((fn) => fn(currentState));
		jest
			.spyOn(store, "getState")
			.mockImplementation((): RootState => currentState);
	});

	it("should render signup page", async () => {
		renderWithProvidersReduxAndRouter(<App />);
		const user = userEvent.setup();

		await user.click(screen.getByTestId("signup-pass"));

		expect(
			screen.queryByText(/Authentication/i, { selector: "h1" })
		).not.toBeInTheDocument();
		expect(
			screen.getByText(/Registration/i, { selector: "h1" })
		).toBeInTheDocument();
	});
	it("should render login page", async () => {
		renderWithProvidersReduxAndRouter(<App />);
		const user = userEvent.setup();

		await user.click(screen.getByText("Login"));

		expect(
			screen.getByText(/Authentication/i, { selector: "h1" })
		).toBeInTheDocument();
		expect(
			screen.queryByText(/Registration/i, { selector: "h1" })
		).not.toBeInTheDocument();
	});
	it("should render chat page", async () => {
		renderWithProvidersReduxAndRouter(<App />);

		const mockResponse = {
			accessToken: "1",
			user: {
				name: "1",
				username: "1",
				userId: "1",
				userImg: "1",
				channels: [],
				dms: [],
				status: "1",
				notifications: []
			}
		};

		fetchMock.mockResponse(JSON.stringify(mockResponse));

		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: "Log in" }));

		const chatPagePiece = await screen.findByAltText(/birdImg/i);

		expect(chatPagePiece).toBeInTheDocument();
		expect(
			screen.queryByText(/Authentication/i, { selector: "h1" })
		).not.toBeInTheDocument();
		expect(
			screen.queryByText(/Registration/i, { selector: "h1" })
		).not.toBeInTheDocument();
	});
});
