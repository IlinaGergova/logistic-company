import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { createAdmin } from './create-admin';
import { Role } from 'src/enums/role';
// import { Role } from 'src/enums/role';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    // createAdmin(this.dataSource, this.usersRepository);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(
    role: Role,
    username: string,
    password: string,
    dataSource: DataSource,
  ): Promise<number> {
    const userLike = {
      username: username,
      password: password,
      role: role,
    };
    const user = this.usersRepository.create(userLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(user);
    });

    return (await this.usersRepository.findOneBy({ username: username })).id;
  }
}
