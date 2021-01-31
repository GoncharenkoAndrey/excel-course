import {DOMListener} from "@core/DOMListener";
export class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || "";
		this.emitter = options.emitter;
		this.unsbscribers = [];
		this.prepare();
	}
	toHTML() {
		return "";
	}
	$emit(event, args) {
		this.emitter.emit(event, ...args);
	}
	$on(event, action) {
		 const unsubscribe = this.emitter.subscribe(event, action);
		 this.unsubscribers.push(unsibscribe);
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
