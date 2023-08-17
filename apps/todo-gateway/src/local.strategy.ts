import { ForbiddenException, Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(@Inject('ADMIN_SERVICE') private client: ClientProxy) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    try {
      const user: any = await this.client.send('get_user_by_email', { email });
      if (user) {
        const verifiedPassword = await bcrypt.compare(password, user.password)
        if (verifiedPassword) return user
      }
      throw new ForbiddenException('User or Password incorrect')
    } catch (error) {
      throw new ServiceUnavailableException(error)
    }
  }
}
