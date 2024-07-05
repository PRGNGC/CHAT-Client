import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getChannels } from "./api/channelsApi";

export function loadChannels(page: number, search?: string) {
	return useQuery({
		queryKey: ["channels", page, search],
		queryFn: () => getChannels(page, search),
		placeholderData: keepPreviousData
	});
}
