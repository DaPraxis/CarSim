class TodoList {
	// Abstract class for todo lists, to allow for a common public interface
	
	constructor(items, todoStyle, domObject) {
		// items: array of strings
		// todoStyle: string

		this.items = items;
		this.remaining = items.length;
		this.todoStyle = todoStyle;
		this.domObject = domObject
	}

	// "crosses out" a completed item from the list, returns true if successful
	crossOut(item) {
		// item: string
		throw "Error: crossOut not implemented for abstract TodoList class."
	}

	// returns true iff every item on the todo list has been dealt with
	completed() {
		console.log("completed!");
		return this.remaining === 0;
	}
}

class ListTodoList extends TodoList {
	// List-style todo lists, aka the default

	constructor(items, todoStyle, domObject) {
		super(items, "list", domObject);
		for (let item of items) {
			$(this.domObject).append(`<div class="todoItem">${item}</div>`);
		}
		// TODO: display todo list on screen
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
	// Objective-style todo list, aka will display only one objective at a time
	// Current objective is the top of the stack of items, aka the last item in
	// this.items

	constructor(items, todoStyle, domObject) {
		super(items, "objective", domObject);
		$(this.domObject).append(`<div class="todoItem">${this.items[this.remaining - 1]}</div>`);
	}

	// TODO: currently does not work!
	crossOut(item) {
		if (this.items.indexOf(item) === this.remaining - 1) {
			// TODO: display next objective
			let domItem = this.domObject.children[5 - this.remaining];
			domItem.classList.add("crossOut");
			$(domItem).append(`<i class="fas fa-check"></i>`);
			this.remaining -= 1;
			$(this.domObject).append(`<div class="todoItem">${this.items[this.remaining - 1]}</div>`);
			return true;
		} else {
			return false;
		}
	}
}