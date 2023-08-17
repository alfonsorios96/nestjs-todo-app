import { Body, Controller, HttpStatus, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './auth.dto';

@Controller('auth')
@ApiTags('Authenctication')
export class AuthController {
  constructor(private jwtService: JwtService, @Inject('ADMIN_SERVICE') private client: ClientProxy) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req) {
    const user = req.user;
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    return { token: this.jwtService.sign(payload) };
  }

  @Post('/signup')
  create(@Body() payload: LoginDTO) {
    return this.client.send({cmd: 'create_user'}, payload);
  }
}
