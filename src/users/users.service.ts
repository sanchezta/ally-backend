import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findAll(
    page: number = 1,
    limit: number = 5,
    name?: string,
    email?: string,
  ) {
    const query = this.usersRepository.createQueryBuilder('user')
      .take(limit)
      .skip((page - 1) * limit);

    if (name) {
      query.andWhere('LOWER(user.name) LIKE LOWER(:name)', { name: `%${name}%` });
    }

    if (email) {
      query.andWhere('LOWER(user.email) LIKE LOWER(:email)', { email: `%${email}%` });
    }

    const [users, total] = await query.getManyAndCount();

    return {
      data: users,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async updateLastLogin(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      user.lastLogin = new Date();
      await this.usersRepository.save(user);
    }
    return user;
  }
}
