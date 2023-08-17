import { Injectable } from '@nestjs/common';
import { CreateUserDTO, FindUserDTO } from './user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import * as mongodb from 'mongodb'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword
    })
    console.log(user)
    return this.userRepository.save(user)
  }

  findOne(user: FindUserDTO) {
    return this.userRepository.findOneBy({ _id: new mongodb.ObjectId(user.id) })
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }
}
