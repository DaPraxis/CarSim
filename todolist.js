class TodoList {
	// Abstract class for todo lists, to allow for a common public interface
	
	constructor(items, todoStyle) {
		// items: array of strings
		// todoStyle: string

		this.items = items;
		this.todoStyle = todoStyle;
	}

	// removes a completed item from the list, returns true if successful
	crossOut(item) {
		// item: string
		throw "Error: crossOut not implemented for abstract TodoList class."
	}

	// returns true iff every item on the todo list has been dealt with
	completed() {
		return this.items.length == 0;
	}
}

class ListTodoList extends TodoList {
	// List-style todo lists, aka the default

	constructor(items, todoStyle) {
		super(items, todoStyle);
		// TODO: display todo list on screen
	}

	crossOut(item) {
		// finds item in the list of items, removes it
		for (i = 0; i < this.items.length; i += 1) {
			if (item = this.items[i]) {
				// TODO: cross out in displayed list
				this.items.splice(i, i + 1);
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

	constructor(items, todoStyle) {
		super(items, todoStyle);
		// TODO: display objective on screen
	}

	crossOut(item) {
		// removes item if it is the top of the stack
		top = this.items.pop()
		if (item == top) {
			// TODO: display next objective
			return true;
		} else {
			this.items.push(top);
			return false;
		}
	}
}