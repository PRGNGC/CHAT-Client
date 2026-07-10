export async function getUser() {
	const response = await fetch("http://localhost:3500/api/user/get", {
		method: "GET",
		credentials: "include"
	});
	return await response.json();
}
