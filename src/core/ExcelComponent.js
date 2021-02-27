import {DOMListener} from "@core/DOMListener";
export class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || "";
		this.emitter = options.emitter;
		this.subscribe = options.subscribe || [];
		this.store = options.store;
		this.unsubscribers = [];
		this.prepare();
	}
	toHTML() {
		return "";
	}
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}
	$on(event, action) {
		const unsubscribe = this.emitter.subscribe(event, action);
		this.unsubscribers.push(unsubscribe);
	}
	$dispatch(action) {
		this.store.dispatch(action);
	}
	storeChanged() {}
	isWatching(key) {
		return this.subscribe.includes(key);
	}
	prepare() {
	}
	init() {
		this.initDOMListeners();
	}
	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach((unsubscribe) => unsubscribe());
	}
}
