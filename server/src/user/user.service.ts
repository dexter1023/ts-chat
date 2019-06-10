import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    let users = this.UserModel.find({}).exec()
    users = users.map(user => users.schema.methods.serialize(user));
    return users;
  }

  async getUserById(id: string): Promise<User> {
    let user = this.UserModel.findById(id).exec();
    user = user.schema.methods.serialize(user);
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({email}).exec();
    return user;
  }

  async saveUser(body: CreateUserDTO): Promise<User> {
    const user = this.UserModel(body);
    return await user.save();
  }

  async updateUser(id: string, body: CreateUserDTO): Promise<User> {
    const res = this.UserModel
      .findByIdAndUpdate(id, body, {new: true});
    return res;
  }
  async deleteUser(id: string): Promise<any> {
    const res = this.UserModel
      .findByIdAndDelete(id);
    return res;
  }
}
