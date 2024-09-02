import { Company } from 'src/company/company.entity';
import { Position } from 'src/enums/role';
import { Office } from 'src/office/office.entity';
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
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column({ type: 'enum', enum: Position })
  position: Position;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Company, (company) => company.id, { eager: true })
  @JoinColumn()
  company: Company;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Office, (office) => office.id, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  office: Office;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => User, (user) => user.id, { eager: true })
  @JoinColumn()
  user: User;
}
