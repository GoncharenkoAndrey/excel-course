import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "./table.template";
import {shouldResize, isCell, matrix, nextSelector} from "./table.function";
import {resizeHandler} from "./table.resize";
import {TableSelection} from "./TableSelection";
export class Table extends ExcelComponent {
	static className = "excel__table";
	constructor($root, options) {
		super($root, {
			listeners: ["mousedown", "keydown"],
			...options
		});
	}
	prepare() {
		this.selection = new TableSelection();
	}
	init() {
		super.init();
		const $cell = this.$root.find('[data-id="0:0"]');
		this.selection.select($cell);
		this.$on("formula:input", (text) => {
			this.selection.current.text(text);
		});
		this.unsbscribe.push(unsbscribeInput);
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
		else if(isCell(event)) {
			const $cell = $(event.target);
			if(event.shiftKey) {
				const $cells = matrix($cell, this.selection.current)
					.map((id) => this.$root.find(`[data-id="${id}"]`));
				this.selection.selectGroup($cells);
			}
			else {
				this.selection.select($cell);
			}
		}
	}
	onMouseup() {
	}
	onMousemove() {
	}
	onKeydown() {
		const keys = [
			"Enter",
			"Tab",
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown"
		];
		const {key} = event;
		if(keys.includes(key)) {
			event.preventDefault();
			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			this.selection.select($next);
		}
	}
	destroy() {
		super.destroy();
	}
}
