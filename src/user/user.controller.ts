import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<User> {
    const result = await this.userService.createUser(username, password);
    return result;
  }
}
