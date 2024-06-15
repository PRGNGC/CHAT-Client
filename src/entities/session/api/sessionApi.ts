export async function login(login: string, password: string) {
	const response = await fetch("http://localhost:3500/api/auth/login", {
		method: "POST",
		body: JSON.stringify({
			login: login,
			password: password
		})
	});

	return response.json();
}

export async function signup(
	login: string,
	password: string,
	status: string,
	img: File
) {
	const formData = new FormData();
	formData.append("login", login);
	formData.append("password", password);
	formData.append("status", status);
	formData.append("img", img);

	const response = await fetch("http://localhost:3500/api/auth/signup", {
		method: "POST",
		body: formData
	});

	return response.json();
}
