import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getDms } from "./api/dmsApi";

export function loadDms(page: number, search?: string) {
	return useQuery({
		queryKey: ["dms", page, search],
		queryFn: () => getDms(page, search),
		placeholderData: keepPreviousData
	});
}
