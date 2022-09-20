import "./style.css";
import { format } from "date-fns";
import { renderInbox, renderProjects } from "./DOM";

export class TodoItem {
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
    this.isComplete = false;
  }
}

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
    this.projects.splice(index, 1);
  },
};

const demoProject = new Project("Demo project");
const demoProject2 = new Project("Demo project2");

const toClean = new TodoItem("to clean bath", "5pm");
const toRun = new TodoItem("to run", "5.09");
const toClean2 = new TodoItem("to clean room", "2pm");

demoProject.addTodo(toClean);
demoProject2.addTodo(toClean2);
demoProject2.addTodo(toRun);

todoApp.addProject(demoProject);
todoApp.addProject(demoProject2);

renderInbox();
renderProjects();

/* 
TODO

-- templates to clean code in DOM
-- where are we on the page
-- local storage

3.1 uncomplete todos and render accordingly
4. work with dates and today/week buttons - filter array tictactoe
+sort for listing (urgents on the top)
4.1. no projects with the same name - error
6. css: burger for mobile, maybe transition?
7. add localstorage

 */
