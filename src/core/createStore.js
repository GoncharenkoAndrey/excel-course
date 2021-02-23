export function createStore(rootReducer, initialState = {}) {
	let state = rootReducer({...initialState}, {type: "__INIT__"});
	let listeners = [];
	return {
		subscribe(listener) {
			listeners.push(listener);
			return {
				unsibscribe() {
					listeners = listeners.filter((l) => l !== listener);
				}
			};
		},
		dispatch(action) {
			state = rootReducer(state, action);
			listeners.forEach((listener) => listener(state));
		},
		getState() {
			return JSON.parse(JSON.stringify(state));
		}
	};
}