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
			const $resizer = $(event.target);
			const $parent = $resizer.closest('[data-type="resizable"]');
			const coordinates = $parent.getCoordinates();
			const type = $resizer.data.resize;
			const cells = this.$root.findAll(`[data-column="${$parent.data.column}"]`);
			document.onmousemove = (e) => {
				if(type === "column") {
					const delta = e.pageX - coordinates.right;
					const value = coordinates.width + delta;
					$parent.css({width: value + "px"});
					cells.forEach((element) => element.style.width = value + "px");
				}
				else {
					const delta = e.pageY - coordinates.bottom;
					const value = coordinates.height + delta;
					$parent.css({height: value + "px"});
				}
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
