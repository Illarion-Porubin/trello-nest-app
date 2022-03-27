import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: number) {
    return this.userService.getUserByValue(value);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
