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
			const sideProperty = type === "column" ? "bottom" : "right";
			let value;
			$resizer.css({
				opacity: 1,
				[sideProperty]: "-5000px"
			});
			document.onmousemove = (e) => {
				if(type === "column") {
					const delta = e.pageX - coordinates.right;
					value = coordinates.width + delta;
					$resizer.css({right: -delta + "px"});
				}
				else {
					const delta = e.pageY - coordinates.bottom;
					value = coordinates.height + delta;
					$resizer.css({
						bottom: -delta + "px"
					});
				}
			};
			document.onmouseup = () => {
				document.onmousemove = null;
				document.onmouseup = null;
				if(type === "column") {
					$parent.css({width: value + "px"});
					this.$root.findAll(`[data-column="${$parent.data.column}"]`).forEach((element) => element.style.width = value + "px");
				}
				else {
					$parent.css({height: value + "px"});
				}
				$resizer.css({
					opacity: 0,
					bottom: 0,
					right: 0
				});
			};
		}
	}
	onMouseup() {
	}
	onMousemove() {
	}
}
