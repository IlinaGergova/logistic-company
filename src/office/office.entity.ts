import { Company } from 'src/company/company.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Office {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Company, (company) => company.id, { eager: true })
  @JoinColumn()
  company: Company;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  info: string;
}
