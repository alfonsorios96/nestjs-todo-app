import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'typeorm';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(12)
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class FindUserDTO {
  @IsNotEmpty()
  id: ObjectId;
}

export class FindUserByEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}