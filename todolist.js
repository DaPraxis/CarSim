class TodoList {
	// Abstract class for todolists, to allow for a common public interface
	
	constructor(items, domObject) {
		// items: array of strings
		// todoStyle: string

		this.items = items;
		this.remaining = items.length;
		this.todoStyle = "abstract";
		this.domObject = domObject
	}

	// "crosses out" a completed item from the list, returns true if successful
	crossOut(item) {
		// item: string
		throw "Error: crossOut not implemented for abstract TodoList class."
	}

	// returns true iff every item on the todolist has been dealt with
	completed() {
		return this.remaining === 0;
	}

	inList(item) {
		return item in this.items;
	}
}

class ListTodoList extends TodoList {
	// List-style todolists, aka the default

	constructor(items, domObject) {
		super(items, domObject);
		this.todoStyle = "list";
		for (let item of items) {
			$(this.domObject).append(`<div class="todoItem">${item}</div>`);
		}
	}

	crossOut(item) {
		// finds item in the list of items, crosses it out
		for (let i = 0; i < this.items.length; i += 1) {
			if (item === this.items[i]) {
				let domItem = this.domObject.children[i];
				domItem.classList.add("crossOut");
				$(domItem).append(`<i class="fas fa-check"></i>`);
				this.remaining -= 1;
				return true;
			}
		}
		return false;
	}
}

class ObjectiveTodoList extends TodoList {
	// Objective-style todolist, aka will display only one objective at a time
	// Current objective is the top of the stack of items, aka the last item in
	// this.items

	constructor(items, domObject) {
		super(items, domObject);
		this.todoStyle = "objective";
		this.current = 0;
		$(domObject).append(`<div class="todoItem">${items[this.current]}</div>`);
	}

	crossOut(item) {
		if (this.items[this.current] === item) {
			// TODO: display next objective
			let domItem = this.domObject.children[this.current];
			domItem.classList.add("crossOut");
			$(domItem).append(`<i class="fas fa-check"></i>`);
			this.remaining -= 1;
			this.current += 1;
			if (this.remaining !== 0) {
				$(this.domObject).append(`<div class="todoItem">${this.items[this.current]}</div>`);
			}
			return true;
		} else {
			return false;
		}
	}

	inList(item) {
		return this.items[this.current] === item;
	}
}