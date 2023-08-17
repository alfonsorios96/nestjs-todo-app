import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "./auth.module";
import { TodoController } from "./todo.controller";
import { UserController } from "./user.controller";

@Module({
  imports: [
    ClientsModule.register([
      { name: 'ADMIN_SERVICE', transport: Transport.TCP, options: { port: 3001 }},
    ]),
    AuthModule,
  ],
  controllers: [TodoController, UserController]
  
})
export class GatewayModule{}