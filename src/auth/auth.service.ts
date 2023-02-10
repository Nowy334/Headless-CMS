import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ user: any | null; message: string | null }> {
    const user = await this.userService.getUser({ username });
    let validatePassword;
    if (user) {
      validatePassword = await bycrypt.compare(pass, user.password);
    }
    if (user && validatePassword) {
      const { password, ...result } = user;
      const object = {
        user: result,
        message: null,
      };
      return object;
    } else if (!user) {
      return {
        user: null,
        message: "User don't exist",
      };
    } else if (!validatePassword) {
      return {
        user: null,
        message: 'Password is incorrect',
      };
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user._doc.username, sub: user._doc._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
