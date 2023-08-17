import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';

const { JWT_KEY, JWT_EXPIRE } = process.env

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([
      { name: 'ADMIN_SERVICE', transport: Transport.TCP, options: { port: 3001 }},
    ]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: JWT_EXPIRE,
      },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
