import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Task, TaskTitle, TaskUpdate } from 'src/types/tasks';

@Injectable()
export class TasksService {
  private readonly tasks: Task[];
  constructor() {
    this.tasks = [];
  }

  getTasks() {
    return this.tasks;
  }

  addTask(title: TaskTitle) {
    const task: Task = {
      id: randomUUID(),
      completed: false,
      ...title,
    };
    this.tasks.push(task);
    return 'Task added successfully';
  }

  removeTask(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  updateTask(id: string, task: TaskUpdate) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        ...task,
      };
      return true;
    }
    return false;
  }
}
