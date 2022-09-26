import "./style.css";
import { format } from "date-fns";
import { renderInbox, renderProjects } from "./DOM";
import { Storage } from "./storage";

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

  getDescription() {
    return this.description;
  }

  editProject(newDescription) {
    this.description = newDescription;
  }

  setTodos(todos) {
    this.todoList = todos;
  }

  getTodos() {
    return this.todoList;
  }

  addTodo(todoItem) {
    this.todoList.push(todoItem);
  }

  removeTodo(index) {
    this.todoList.splice(index, 1);
  }
}

export let todoApp = {
  projects: [],

  setProjects(projects) {
    this.projects = projects;
  },

  getProjects() {
    return this.projects;
  },

  contains(projectName) {
    return this.projects.some(
      (project) => project.getDescription() === projectName
    );
  },

  getIndex(projectName) {
    return this.projects.findIndex(
      (project) => project.getDescription() === projectName
    );
  },

  addProject(project) {
    this.projects.push(project);
  },

  removeProject(index) {
    this.projects.splice(index, 1);
  },
};

//function loadHomePage

/* 
const demoProject = new Project("Demo project");
const demoProject2 = new Project("Demo project2");

const toClean = new TodoItem("to clean bath", "5pm");
const toRun = new TodoItem("to run", "5.09");
const toClean2 = new TodoItem("to clean room", "2pm");

demoProject.addTodo(toClean);
demoProject2.addTodo(toClean2);
demoProject2.addTodo(toRun);

Storage.addProject(demoProject);
Storage.addProject(demoProject2); */

todoApp = Storage.getTodoApp() || Object.create(todoApp);

renderInbox();
renderProjects();

/* 
TODO

-- work with dates and today/week buttons - filter array tictactoe
+sort for listing (urgents on the top)

-- complete logics?

 */
