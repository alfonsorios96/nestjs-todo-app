import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_AUTH_SOURCE } = process.env
@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      authSource: DB_AUTH_SOURCE,
      logging: "all",
      entities: [__dirname + '/**/*.entity{.js}'],
    }),
    UserModule,
    TodoModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
