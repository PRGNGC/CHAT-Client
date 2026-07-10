function padTo2Digits(num: number) {
	return num.toString().padStart(2, "0");
}

export function getCurrentTimeFormatted() {
	const date = new Date();

	return [
		padTo2Digits(date.getHours()),
		padTo2Digits(date.getMinutes()),
		padTo2Digits(date.getSeconds())
	].join(":");
}
