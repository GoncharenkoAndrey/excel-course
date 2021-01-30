import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "./table.template.js";
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
		if(event.target.dataset.resize) {
			const $resizer = event.target;
			const $parent = $($resizer.closest('[data-type="resizable"]'));
			const coordinates = $parent.getCoordinates();
			document.onmousemove = (e) => {
				const delta = e.pageX - coordinates.right;
				const value = coordinates.width + delta;
				$parent.$el.style.width = value + "px";
			};
			document.onmouseup = () => {
				document.onmousemove = null;
			};
		}
	}
	onMouseup() {
	}
	onMousemove() {
	}
}
