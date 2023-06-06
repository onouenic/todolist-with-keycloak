import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { GetTaskDto } from './dto/GetTask.dto';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskRepository: Model<Task>,
  ) {}

  async findAll(): Promise<GetTaskDto[]> {
    return await this.taskRepository.find();
  }

  async createTask(task: CreateTaskDto): Promise<CreateTaskDto> {
    const newTask = { ...task };
    return await this.taskRepository.create(newTask);
  }

  async updateTask(
    id: string,
    task: UpdateTaskDto,
  ): Promise<UpdateWriteOpResult> {
    return await this.taskRepository.updateOne({ _id: id }, { $set: task });
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    await this.taskRepository.deleteOne({ _id: id });
    return { message: 'Task deleted successfully' };
  }
}
