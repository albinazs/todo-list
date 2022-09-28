import { toDate, isToday, isThisWeek } from "date-fns";
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

  getDateFormatted() {
    const day = this.dueDate.split("/")[0];
    const month = this.dueDate.split("/")[1];
    const year = this.dueDate.split("/")[2];
    return `${month}/${day}/${year}`;
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

  getTodayTodos() {
    return this.todoList.filter((todo) =>
      isToday(toDate(new Date(todo.getDateFormatted())))
    );
  }

  getThisWeekTodos() {
    return this.todoList.filter((todo) =>
      isThisWeek(toDate(new Date(todo.getDateFormatted())))
    );
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

todoApp = Storage.getTodoApp() || Object.create(todoApp);
