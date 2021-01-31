export function capitalize(string) {
	if(typeof string !== "string") {
		return "";
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}
export function range(start, end) {
	let sign = 1;
	if(start > end) {
		sign = -1;
	}
	return new Array((end - start + 1) * sign)
		.fill('')
		.map((v, index) => start + index);
}
