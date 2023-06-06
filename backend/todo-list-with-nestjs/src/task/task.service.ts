import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './task.schema';
import { UpdateWriteOpResult } from 'mongoose';
import { GetTaskDto } from './dto/GetTask.dto';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async findAll(): Promise<GetTaskDto[]> {
    return await this.taskRepository.findAll();
  }

  async createTask({ name }: CreateTaskDto): Promise<CreateTaskDto> {
    return await this.taskRepository.createTask({ name });
  }

  async updateTask(
    id: string,
    task: UpdateTaskDto,
  ): Promise<UpdateWriteOpResult> {
    return await this.taskRepository.updateTask(id, {
      completed: task.completed,
    });
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    return await this.taskRepository.deleteTask(id);
  }
}
