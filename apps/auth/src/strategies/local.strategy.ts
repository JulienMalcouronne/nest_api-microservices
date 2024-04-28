import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStragegy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    try {
      return this.usersService.verifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
