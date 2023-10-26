import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Post()
  addTask(@Body('title') title: string) {
    if (!title) throw new HttpException('Title is required', 400);
    return this.tasksService.addTask({ title });
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    if (!id) throw new HttpException('Id is required', 400);
    const removed = this.tasksService.removeTask(id);
    if (!removed) throw new HttpException('Task not found', 404);
    return 'Task removed successfully';
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body('completed') completed: boolean) {
    if (!id) throw new HttpException('Id is required', 400);
    if (completed === undefined)
      throw new HttpException('Completed is required', 400);
    const updated = this.tasksService.updateTask(id, { completed });
    if (!updated) throw new HttpException('Task not found', 404);
    return 'Task updated successfully';
  }
}
