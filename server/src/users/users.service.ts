import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.enity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    const admin = await this.usersRepository.findOneBy({ username: 'admin' });
    if (!admin) {
      await this.usersRepository.save(
        this.usersRepository.create({
          username: 'admin',
          password: bcrypt.hashSync('admin'),
        }),
      );
    }
  }

  async findBy(where: FindOptionsWhere<UserEntity>): Promise<any> {
    return this.usersRepository.findOneByOrFail(where);
  }
}
