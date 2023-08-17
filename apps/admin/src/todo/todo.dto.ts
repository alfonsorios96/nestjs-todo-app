import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  title: string;

  description: string;
  
  @IsNotEmpty()
  user: string;
}

export class FindByIdDTO {
  @IsNotEmpty()
  id: string;
  
  @IsNotEmpty()
  userId: string;
}

export class UpdateTaskDTO {
  @IsOptional()
  title: string;
  
  @IsOptional()
  description: string;

  @IsOptional()
  status: boolean; 
}

export class UpdateMessageDTO {
  @IsNotEmpty()
  id: string;
  
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  task: UpdateTaskDTO 
}

export class FindAllDTO {
  @IsNotEmpty()
  userId: string
}
