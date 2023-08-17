import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';
@Entity()
export class Todo {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;
  
  @Column()
  description: string;

  @Column()
  status: boolean;

  @Column()
  user: string;
}

