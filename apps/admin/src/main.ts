import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AdminModule,{
  transport: Transport.TCP,
  options: { port: 3001 }
  });
  await app.listen();
}
bootstrap();