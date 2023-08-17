import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDTO, FindAllDTO, FindByIdDTO, UpdateMessageDTO } from './todo.dto';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as mongodb from "mongodb";


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) {}

  create(createTodoDto: CreateTodoDTO, ) {
    const task = this.todoRepository.create({
      ...createTodoDto,
      status: false
    });
    return this.todoRepository.save(task)
  }

  async findById(findByIdDTO: FindByIdDTO) {
    const task = await this.todoRepository.findOneBy({_id: new mongodb.ObjectId(findByIdDTO.id)});
    if (task.user === findByIdDTO.userId) {
      return task
    } else {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "You don't have permissions to get this task",
      }, HttpStatus.FORBIDDEN);
    }
  }

  findAll(findAllDTO: FindAllDTO) {
    return this.todoRepository.find({
      where: { user:  findAllDTO.userId }
    });
  }

  async update(updateMessageDTO: UpdateMessageDTO) {
    const task = await this.todoRepository.findOneBy({ _id: new mongodb.ObjectId(updateMessageDTO.id) });
    if (task.user === updateMessageDTO.userId) {
      return this.todoRepository.update(updateMessageDTO.id, updateMessageDTO.task);
    } else {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "You don't have permissions to update this task",
      }, HttpStatus.FORBIDDEN);
    }
  }

  async remove(findByIdDTO: FindByIdDTO) {
    const task = await this.todoRepository.findOneBy({ _id: new mongodb.ObjectId(findByIdDTO.id) });
    if (task.user === findByIdDTO.userId) {
      return this.todoRepository.delete({ _id: new mongodb.ObjectId(findByIdDTO.id) });
    } else {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "You don't have permissions to delete this task",
      }, HttpStatus.FORBIDDEN);
    }
  }
}
