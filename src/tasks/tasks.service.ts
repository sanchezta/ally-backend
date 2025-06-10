import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async create(userPayload: { sub: number }, dto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepo.findOneBy({ id: userPayload.sub });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const task = this.taskRepo.create({ ...dto, user });
    return this.taskRepo.save(task);
  }

  async findAllByUser(userId: number): Promise<Task[]> {
    return this.taskRepo.find({ where: { user: { id: userId } } });
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    await this.taskRepo.update(id, dto);
    return this.taskRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepo.delete(id);
  }
}
