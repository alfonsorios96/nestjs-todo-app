import {
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, FindUserByEmailDTO, FindUserDTO } from './user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}
  
  @MessagePattern({cmd: 'create_user'})
  async create(createUserDto: CreateUserDTO) {
    const response: any = await this.userService.create(createUserDto);
    if (response?.email) {
      return {
        status: HttpStatus.CREATED,
        message: `User ${createUserDto.email} has been created`
      }
    }
  }

  @MessagePattern({cmd: 'get_user'})
  findOne(user: FindUserDTO) {
    return this.userService.findOne(user);
  }

  @MessagePattern({cmd: 'get_user_by_email'})
  findOneByEmail(userEmail: FindUserByEmailDTO) {
    return this.userService.findOneByEmail(userEmail.email);
  }

}
