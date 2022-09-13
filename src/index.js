import "./style.css";
import { format } from "date-fns";
import { renderInbox } from "./DOM";

/* data structures 
todoApp
*/

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
}

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

export const todoApp = {
  projects: [],
  addProject(project) {
    this.projects.push(project);
  },
};

// demo project and item in todoapp
const toClean = new TodoItem("to clean room", "2pm");
toClean.editTodo("to mop", "4pm");
const toRun = new TodoItem("to run", "5.09");

export const demoProject = new Project("demo");

const demoProject2 = new Project("demo2");

demoProject.addTodo(toClean);
demoProject2.addTodo(toClean);
demoProject2.addTodo(toRun);

todoApp.addProject(demoProject);
todoApp.addProject(demoProject2);

renderInbox();

/* 
mornings weather should be calm
10-12 private
8-11.30
8-9.30/10 
elearning last week of sept
24hours after dive no flight troodos
2/3/4

functions to run on load:
1) render inbox todos
2) render projects

{todoApp}
- [projects]
- toAdd project
- toRemove project
! - show inbox, today, next 7 days and completed
loop through all projects todolists and list those with duedate = 
usw filter map foreach - tictactoe ref

{project}
- title
- data-key === array index for dom remove/edit
- [todo items]
- toEdit project
- toAdd todo
- toRemove todo

{todo item}:
- desc
- dueDate
- isComplete
- data-key for dom remove/edit
- toEdit (incl isComplete) AND ability to change projects from the list

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
