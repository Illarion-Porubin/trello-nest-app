import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {}

  async getAllUsers() {
    const user = await this.userRepository.findAll();
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    await user.save();
    return user;
  }

  async getUserByValue(value: number) {
    const role = await this.userRepository.findOne({ where: { value } })
    return role;
  }
}
