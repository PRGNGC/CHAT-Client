import { ChannelsAccordion } from "./ChannelsAccordion";
import { renderWithProvidersReduxAndRouter } from "@/shared/utils/renderWithReduxAndRouter";
import { screen } from "@testing-library/react";
import { useAppSelector } from "@/shared/utils/hooks";
import { RootState } from "@/app/store/store";
import { IMessage } from "@/entities/message/types";
import { IUser } from "@/entities/user/types";
import { IDm } from "@/entities/dm/types";
import { IChannel } from "@/entities/channel/types";
import {
	IApplyRequest,
	IApplyResponse,
	IChannelDeletion,
	IInvitation,
	IMention,
	IUnreadMessage
} from "@/entities/notification/types";
import userEvent from "@testing-library/user-event";

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

describe("", () => {
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
	});

	it("", async () => {
		renderWithProvidersReduxAndRouter(<ChannelsAccordion />);

		const user = userEvent.setup();

		await user.click(screen.getByRole("group"));

		expect(
			screen.getByPlaceholderText("Search channels...")
		).toBeInTheDocument();
	});
});
