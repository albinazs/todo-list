import "./style.css";

let project = [];


class TodoItem {
  constructor(description, dueDate) {
    this.description = description;
    this.dueDate = dueDate;
  }

  editTodo(newDescription, newDueDate) {
    this.description = newDescription;
    this.dueDate = newDueDate;
  }
}

const toClean = new TodoItem("to clean room", "2pm");
console.log(toClean);

toClean.editTodo("to mop", "4pm");
console.log(toClean);

class Project {
  constructor(description) {
    this.description = description;
    this.todoList = [];
  }

  editProject(newDescription) {
    this.description = newDescription;
  }

  addTodo(todoItem) {
    this.todoList.push(todoItem);
  }
}

const demoProject = new Project('demo');
console.log(demoProject);

demoProject.addTodo(toClean);
console.log(demoProject);




/* 
todo app

dom
- inbox (all)
- today 
- this week
- completed
- projects list

{todo list}
- [projects]
- toAdd project
- toRemove project

{project}
- title
- data-key for dom remove/edit
- [todo items]
- toEdit project
- toAdd todo
- toRemove todo

{todo item}:
- desc
- dueDate
- isComplete
- data-key for dom remove/edit
- toEdit (incl isComplete)

app logic object or module?
- creates todos
- setting todos as complete
- changing priority, date, desc etc

DOMdtuff
- visualise app logic

ref https://artis-dev.github.io/to-do-list/#

TODO
- use burger nav
- use transition
 */
