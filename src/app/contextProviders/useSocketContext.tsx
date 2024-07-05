import { createContext, useContextSelector } from "use-context-selector";
import { socket } from "../socket";

const SocketContext = createContext(socket);

export function useSocketContext() {
	return useContextSelector(SocketContext, () => socket);
}
