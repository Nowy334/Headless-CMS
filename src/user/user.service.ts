import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}
  async createUser(username: string, password: string): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return this.userModel.create({
      username,
      password: hashedPassword,
    });
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
  async getUserById(id: number): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find({});
  }
}
