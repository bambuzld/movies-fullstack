import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { Repository } from 'typeorm';
import { PostUserDto } from '../dto/post-user.dto';

import { UserEntity } from './../models/user.entity';
import { UserI } from './../models/user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(AppController.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async add(user: UserI): Promise<UserI> {
    return await this.userRepository.save(user);
  }

  async findOne(email: string): Promise<UserI> {
    this.logger.log('findOne', email);
    return await this.userRepository.findOne({ email });
  }

  async findAll(): Promise<UserI[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<UserI> {
    return await this.userRepository.findOne({ id });
  }
}
