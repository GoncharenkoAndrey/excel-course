export class Emitter {
	constructor() {
		this.listeners = {};
	}
	emit(event, ...arguments) {
		if(!Array.isArray(this.listeners[event])){
			return false;
		}
		this.listeners[event].forEach((listener) => {
			listener(...arguments);
		});
		return true;
	}
	subscribe(event, action) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(action);
		return () => {
				this.listeners[event] = 
					this.listeners[event].filter((listener) => listener !== action);
		}
	}
}
