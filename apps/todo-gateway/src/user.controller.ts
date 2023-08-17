import {
  Controller,
  Get,
  Param,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './jwt.guard';

@Controller('user')
@ApiTags('User')
@ApiSecurity('JWT-auth')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(@Inject('ADMIN_SERVICE') private client: ClientProxy) {}

  @ApiSecurity('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.client.send('get_user', { id })
  }

}