import { IDm } from "@/entities/dm/types";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IMessage } from "@/entities/message/types";

interface initialState {
	dms: IDm[];
}

const initialState = { dms: [] as IDm[] };

const dmsSlice = createSlice({
	name: "dms",
	initialState,
	reducers: {
		setDms: (state, action: PayloadAction<{ dms: IDm[] }>) => {
			const { dms } = action.payload;
			state.dms = dms;
		},
		eraseDms: (state) => {
			state.dms = [] as IDm[];
		},
		addDms: (state, action: PayloadAction<{ newDms: IDm }>) => {
			const { newDms } = action.payload;
			state.dms.push(newDms);
		},
		deleteDms: (state, action: PayloadAction<{ deleteDms: IDm }>) => {
			const { deleteDms } = action.payload;
			let dmIndex = -2;
			state.dms.filter((dm, index) => {
				if (deleteDms.id === dm.id) {
					dmIndex = index;
				}
			});
			if (dmIndex !== -2) {
				state.dms.splice(dmIndex, 1);
			}
		},
		updateDms: (
			state,
			action: PayloadAction<{ activeChat: string; newMessage: IMessage }>
		) => {
			const { activeChat, newMessage } = action.payload;
			let roomIndex = -2;
			current(state).dms.find((dm: IDm, index: number) => {
				if (dm.id === activeChat) {
					roomIndex = index;
					return dm;
				}
			});

			if (roomIndex !== -2) {
				state.dms[roomIndex].messages.push(newMessage);
			}
		}
	}
});

export const { setDms, eraseDms, updateDms, addDms, deleteDms } =
	dmsSlice.actions;
export const dmsSelector = (state: RootState) => state.dms.dms;
export default dmsSlice.reducer;
