import { UserI } from './../user/models/user.interface';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { AppController } from 'src/app.controller';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  logger: Logger;
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger();
  }

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log(email, password);
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserI) {
    console.log('user', user);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserI) {
    return await this.usersService.add(user);
  }
}
