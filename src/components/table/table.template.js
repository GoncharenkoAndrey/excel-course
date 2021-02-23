import {toInlineStyles} from "../../core/utils";
import {defaultStyles} from "../../constants";
import {parse} from "../../core/parse";
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;
const CODES = {
	A: 65,
	Z: 90
};
function getWidth(state, index) {
	return (state[index] || DEFAULT_WIDTH) + "px";
}
function getHeight(state, index) {
	return (state[index] || DEFAULT_HEIGHT) + "px";
}
function toCell(state, row) {
	return function(value, column) {
		const id = `${row}:${column}`;
		const width = getWidth(state.columnState, column);
		const data = state.dataState[id];
		const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
		return `<div class="cell"
		data-column="${column}"
		data-id="${id}"
		data-type="cell"
		data-value="${data || ''}"
		style="${styles}; width:${width}" 
		contenteditable>
		${parse(data) || ''}
		</div>`;
	};
}
function toColumn({column, index, width}) {
	return `<div class="column" data-type="resizable" data-column="${index}" style="width: ${width}">
		${column}
		<div class="column-resize" data-resize="column"></div>
	</div>`;
}
function createRow(index, content, state) {
	const resize = index ? '<div class="row-resize" data-resize="row"></div>' : "";
	const height = getHeight(state, index);
	return `<div class="row" data-type="resizable" data-row=${index} style="height:${height}">
		<div class="row-info">
			${index ? index : ''}
			${resize}
		</div>
		<div class="row-data">${content}</div></div>`;
}
function toChar(element, index) {
	return String.fromCharCode(CODES.A + index);
}
function withWidth(state) {
	return function(column, index) {
		return {column, index, width: getWidth(state.columnState, index)};
	};
}
export function createTable(rowsCount = 15, state = {}) {
	const columnsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const columns = new Array(columnsCount).fill('')
		.map(toChar)
		.map(withWidth(state))
		.map(toColumn)
		.join('');
	rows.push(createRow(null, columns, {}));
	for(let row = 0; row < rowsCount; row++) {
		const cells = new Array(columnsCount)
			.fill('')
			.map(toCell(state, row))
			.join('');
		rows.push(createRow(row + 1, cells, state.rowState));
	}
	return rows.join('');
}
