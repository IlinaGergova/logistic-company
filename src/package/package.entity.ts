import { Client } from 'src/client/client.entity';
import { Company } from 'src/company/company.entity';
import { Employee } from 'src/employee/employee.entity';
import { Office } from 'src/office/office.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Company, (company) => company.id, { eager: true })
  @JoinColumn()
  company: Company;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Client, (client) => client.id, { eager: true })
  @JoinColumn()
  sender: Client;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Client, (client) => client.id, { eager: true })
  @JoinColumn()
  recipient: Client;

  @Column({ nullable: true })
  address: string;

  @Column()
  weight: number;

  @Column()
  price: number;

  @Column()
  sentDate: Date;

  @Column()
  receivedDate: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Office, (office) => office.id, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  office: Office;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Employee, (employee) => employee.id, { eager: true })
  @JoinColumn()
  officeWorker: Employee;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Employee, (employee) => employee.id, { eager: true })
  @JoinColumn()
  courier: Employee;
}
