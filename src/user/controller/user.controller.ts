import { PostUserDto } from './../dto/post-user.dto';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import { UserService } from '../service/user.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserI } from '../models/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async add(@Body() user: PostUserDto): Promise<UserI> {
    return await this.userService.add(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserI[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserI> {
    return await this.userService.findById(Number(id));
  }
}
