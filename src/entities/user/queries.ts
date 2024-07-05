import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUser } from "./api/userApi";

export function loadUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => getUser(),
		placeholderData: keepPreviousData
	});
}
