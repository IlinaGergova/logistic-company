import { DataSource, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from 'src/enums/role';

export async function createAdmin(
  dataSource: DataSource,
  usersRepository: Repository<User>,
): Promise<void> {
  const adminLike = {
    username: 'admin',
    password: 'admin',
    role: Role.Admin,
  };
  const admin = usersRepository.create(adminLike);

  await dataSource.transaction(async (manager) => {
    await manager.save(admin);
  });
}
