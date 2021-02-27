import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE} from "./types";
export function rootReducer(state, action) {
	let field;
	let styles;
	switch(action.type) {
	case TABLE_RESIZE:
		field = action.data.type === "column" ? "columnState" : "rowState";
		return {...state, [field]: value(state, field, action)};
	case CHANGE_TEXT:
		field = "dataState";
		return {...state, currentText: action.data.value, [field]: value(state, field, action)};
	case CHANGE_STYLES:
		return {...state, currentStyles: action.data};
	case APPLY_STYLE:
		field = "stylesState";
		styles = state[field] || {};
		action.data.ids.forEach((id) => {
			styles[id] = {...styles[id], ...action.data.value};
		});
		return {...state, [field]: styles, currentStyles: {...state.currentStyles, ...action.data.value}};
	case CHANGE_TITLE:
		return {...state, title: action.data};
	case UPDATE_DATE:
		return {...state, openDate: new Date().toJSON()};
	default:
		return state;
	}
}
function value(state, field, action) {
	const val = state[field] || {};
	val[action.data.id] = action.data.value;
	return val;
}