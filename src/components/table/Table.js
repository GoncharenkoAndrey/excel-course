import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "./table.template";
import {shouldResize, isCell, matrix, nextSelector} from "./table.function";
import {resizeHandler} from "./table.resize";
import {TableSelection} from "./TableSelection";
import {defaultStyles} from "../../constants";
import {parse} from "../../core/parse";
import * as actions from "../../redux/actions";
export class Table extends ExcelComponent {
	static className = "excel__table";
	constructor($root, options) {
		super($root, {
			listeners: ["mousedown", "keydown", "input"],
			...options
		});
	}
	prepare() {
		this.selection = new TableSelection();
	}
	updateTextInStore(value) {
		this.$dispatch(actions.changeText({
			id: this.selection.current.id(),
			value
		}));
	}
	init() {
		super.init();
		this.selectCell(this.$root.find('[data-id="0:0"]'));
		this.$on("formula:input", (value) => {
			this.selection.current.attr("data-value", value)
				.text(parse(value));
			this.updateTextInStore(value);
		this.$on("formula:done", () => {
			this.selection.current.focus();
		});
		this.$on("toolbar:applyStyle", (value) => {
			this.selection.applyStyle(value);
			this.$dispatch(actions.applyStyle({
				value,
				ids: this.selection.selectedIds
			}));
		});
	}
	selectCell($cell) {
		this.selection.select($cell);
		this.$emit("table:select", $cell);
		const styles = $cell.getStyles(Object.keys(defaultStyles));
		this.$dispatch(actions.changeStyles(styles));
	}
	toHTML() {
		return createTable(20, this.store.getState());
	}
	async resizeTable(event) {
		try {
			const data = await resizeHandler(this.$root, event);
			this.$dispatch(actions.tableResize(data));
		}
		catch(e) {
			console.warn("Resize error", e.message);
		}
	}
	onMousedown(event) {
		if(shouldResize(event)) {
			this.resizeTable(event);
		}
		else if(isCell(event)) {
			const $cell = $(event.target);
			if(event.shiftKey) {
				const $cells = matrix($cell, this.selection.current)
					.map((id) => this.$root.find(`[data-id="${id}"]`));
				this.selection.selectGroup($cells);
			}
			else {
				this.selectCell($cell);
			}
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
	onKeydown(event) {
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
			this.selectCell($next);
		}
	}
	onInput(event) {
		this.updateTextInStore($(event.target).text());
	}
	destroy() {
		super.destroy();
	}
}
