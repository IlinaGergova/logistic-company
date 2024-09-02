import { Company } from 'src/company/company.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Company, (company) => company.id, { eager: true })
  @JoinColumn()
  company: Company;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => User, (user) => user.id, { eager: true })
  @JoinColumn()
  user: User;
}
