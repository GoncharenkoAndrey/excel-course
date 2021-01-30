import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "./table.template";
import {shouldResize} from "./table.function";
import {resizeHandler} from "./table.resize";
export class Table extends ExcelComponent {
	static className = "excel__table";
	constructor($root) {
		super($root, {
			listeners: ["mousedown"]
		});
	}
	toHTML() {
		return createTable(20);
	}
	onClick() {
	}
	onMousedown() {
		if(shouldResize(event)) {
			resizeHandler(this.$root, event);
		}
	}
	onMouseup() {
	}
	onMousemove() {
	}
}
