const CODES = {
	A: 65,
	Z: 90
};
function toCell(value, column) {
	return `<div class="cell" data-column="${column}" contenteditable></div>`;
}
function toColumn(column, index) {
	return `<div class="column" data-type="resizable" data-column="${index}">
		${column}
		<div class="column-resize" data-resize="column"></div>
	</div>`;
}
function createRow(index, content) {
	const resize = index ? '<div class="row-resize" data-resize="row"></div>' : "";
	return `<div class="row" data-type="resizable">
		<div class="row-info">
			${index ? index : ''}
			${resize}
		</div>
		<div class="row-data">${content}</div>
		
	</div>`;
}
function toChar(element, index) {
	return String.fromCharCode(CODES.A + index);
}
export function createTable(rowsCount = 15) {
	const columnsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const columns = new Array(columnsCount).fill('')
		.map(toChar)
		.map(toColumn)
		.join('');
	rows.push(createRow(null, columns));
	for(let i = 0; i < rowsCount; i++) {
		const cells = new Array(columnsCount)
			.fill('')
			.map(toCell)
			.join('');
		rows.push(createRow(i + 1, cells));
	}
	return rows.join('');
}
