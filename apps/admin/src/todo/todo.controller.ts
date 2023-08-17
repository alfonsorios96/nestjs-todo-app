import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO, FindAllDTO, FindByIdDTO, UpdateMessageDTO } from './todo.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @MessagePattern({cmd: 'create_todo'})
  create(task: CreateTodoDTO) {
    return this.todoService.create(task);
  }

  @MessagePattern({cmd: 'get_all_todos'})
  findAll(findAllDTO: FindAllDTO) {
    return this.todoService.findAll(findAllDTO);
  }

  @MessagePattern({cmd: 'get_todo_by_id'})
  find(findByIdDTO: FindByIdDTO) {
    return this.todoService.findById(findByIdDTO);
  }

  @MessagePattern({cmd: 'update_todo'})
  update(updateTaskDTO: UpdateMessageDTO) {
    return this.todoService.update(updateTaskDTO);
  }

  @MessagePattern({cmd: 'delete_todo'})
  remove(findByIdDTO: FindByIdDTO) {
    return this.todoService.remove(findByIdDTO);
  }
}
