import "./style.css";
import { format } from "date-fns";
import { renderInbox, renderProjects } from "./DOM";

/* data structures 
todoApp
*/

export class TodoItem {

  constructor(description, dueDate, project) {
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
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

//connection between project and todoitem!!

export class Project {
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

  removeTodo(index) {
    this.todoList.splice(index, 1);
  }
}

export const todoApp = {
  projects: [],

  addProject(project) {
    this.projects.push(project);
  },

  removeProject(index) {
    console.log(index);
    this.projects.splice(index, 1);
  },
};

// demo project and item in todoapp

const demoProject = new Project("demo");
const demoProject2 = new Project("demo2");

const toClean = new TodoItem("to clean room", "2pm", "demo");
const toRun = new TodoItem("to run", "5.09");

demoProject.addTodo(toClean);
demoProject2.addTodo(toClean);
demoProject2.addTodo(toRun);

todoApp.addProject(demoProject);
todoApp.addProject(demoProject2);

renderInbox();
renderProjects();

/* 
TODO

3.0 remove todos
3.1 edit todos and set todos as complete, edit projects
4. work with dates and today/week buttons - filter array tictactoe
+sort for listing (urgents on the top)
4.1. no projects with the same name - error

6. css: burger for mobile, maybe transition?
7. add localstorage

{todoApp}
- [projects]
- toAdd project
- toRemove project
! - show inbox, today, next 7 days and completed

{project}
- title
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

ref https://artis-dev.github.io/to-do-list/#

 */
