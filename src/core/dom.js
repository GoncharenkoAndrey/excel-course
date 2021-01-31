class Dom {
	constructor(selector) {
		this.$el = typeof selector === "string" ? document.querySelector(selector) : selector;
	}
	html(html) {
		if(typeof html === "string") {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}
	text(text) {
		this.$el.textContent = text;
	}
	clear() {
		this.html("");
	}
	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}
	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}
	append(node) {
		if(node instanceof Dom) {
			node = node.$el;
		}
		if(Element.prototype.append) {
			this.$el.append(node);
		}
		else {
			this.$el.appendChild(node);
		}
		return this;
	}
	get data() {
		return this.$el.dataset;
	}
	closest(selector) {
		return $(this.$el.closest(selector));
	}
	getCoordinates() {
		return this.$el.getBoundingClientRect();
	}
	find(selector) {
		return $(this.$el.querySelector(selector));
	}
	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}
	css(styles = {}) {
		Object.keys(styles)
			.forEach((key) => {
				this.$el.style[key] = styles[key];
			});
	}
	addClass(className) {
		this.$el.classList.add(className);
	}
	removeClass(className) {
		this.$el.classList.remove(className);
	}
	focus() {
		this.$el.focus();
		return this;
	}
	id(parse) {
		const id = this.data.id;
		if(parse) {
			const parsed = id.split(':');
			return {
				row: +parsed[0],
				column: +parsed[1]
			};
		}
		return id;
	}
}
export function $(selector) {
	return new Dom(selector);
}
$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if(classes) {
		el.classList.add(classes);
	}
	return $(el);
};
