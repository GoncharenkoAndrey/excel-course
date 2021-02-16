export class Emitter {
	constructor() {
		this.listeners = {};
	}
	emit(event, ...args) {
		if(!Array.isArray(this.listeners[event])) {
			return false;
		}
		this.listeners[event].forEach((listener) => {
			listener(...args);
		});
		return true;
	}
	subscribe(event, action) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(action);
		return () => {
			this.listeners[event] = this.listeners[event].filter((listener) => listener !== action);
		};
	}
}
