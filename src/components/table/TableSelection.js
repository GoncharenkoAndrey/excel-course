export class TableSelection {
	static className = "selected";
	constructor() {
		this.group = [];
		this.current = null;
	}
	select($element) {
		this.clearSelection();
		this.group.push($element);
		$element.focus().addClass(TableSelection.className);
		this.current = $element;
	}
	clearSelection() {
		this.group.forEach(($cell) => $cell.removeClass(TableSelection.className));
		this.group = [];
	}
	selectGroup($group = []) {
		this.clearSelection();
		this.group = $group;
		this.group.forEach(($element) => $element.addClass(TableSelection.className));
	}
	applyStyle(style) {
		this.group.forEach(($element) => $element.css(style));
	}
	get selectedIds() {
		return this.group.map(($element) => $element.id());
	}
}
