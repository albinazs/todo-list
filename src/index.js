import "./style.css";
import { format } from 'date-fns';
import {renderTodos} from './DOM.js';

class TodoItem {
  constructor(description, dueDate) {
    this.description = description;
    this.dueDate = dueDate;
    this.isComplete = false;
  }

  editTodo(newDescription, newDueDate) {
    this.description = newDescription;
    this.dueDate = newDueDate;
  }

  completeTodo() {
    this.isComplete = true;
  }
};

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
};

export const demoProject = new Project("demo");
console.log(demoProject);

demoProject.addTodo(toClean);
console.log(demoProject);

const todoApp = {
  projects: [],
  addProject(project) {
    this.projects.push(project);
  },
};

todoApp.addProject(demoProject);
console.log(todoApp);


renderTodos();
/* 
{todo list}
- [projects]
- toAdd project
- toRemove project
! - show inbox, today, next 7 days and completed
loop through all projects todolists and list those with duedate = 

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
