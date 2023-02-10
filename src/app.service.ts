import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}

  async onModuleInit() {
    const users = await this.userService.getAllUsers();
    if (users.length === 0) {
      await this.userService.createUser('admin', 'admin');
    }
  }
}
