import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Request,
  Inject
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './jwt.guard';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT-auth')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(@Inject('ADMIN_SERVICE') private client: ClientProxy) {}

  @Post()
  create(
    @Body() task: any,
    @Request() req: any
  ) {
    return this.client.send('create_todo', {
      ...task,
      user: req.user.id
    });
  }

  @Get()
  findAll(@Request() req: any) {
    return this.client.send('get_all_todos', { userId: req.user.id });
  }

  @Get(':id')
  find(
    @Param('id') id: ObjectId,
    @Request() req: any
  ) {
    return this.client.send('get_todo_by_id',{
      id,
      userId: req.user.id
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body(ValidationPipe) task: any,
    @Request() req: any
  ) {
    return this.client.send('update_todo', {
      id, 
      task, 
      userId: req.user.id
    });
  }

  @Delete(':id')
  remove(
    @Param('id') id: ObjectId,
    @Request() req: any
  ) {
    return this.client.send('delete_todo',{
      id,
      userId: req.user.id
    });
  }
}
