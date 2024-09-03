import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { UsersService } from 'src/users/users.service';
import { OfficeService } from 'src/office/office.service';
import { Position } from 'src/enums/role';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private usersService: UsersService,
    private officeService: OfficeService,
    private companyService: CompanyService,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findOneByUser(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOne({ where: { user: { id: id } } });
  }

  findByCompanyId(id: number): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: { company: { id: id } },
    });
  }

  findByPosition(companyId: number, position: Position): Promise<Employee[]> {
    return this.employeeRepository
      .createQueryBuilder('employee')
      .where(
        `employee.companyId = "${companyId}" AND employee.position = "${position}"`,
      )
      .getMany();
  }

  findByOffice(officeId: number): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: { office: { id: officeId } },
    });
  }

  findOne(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }

  async create(
    companyId: number,
    userId: number,
    name: string,
    address: string,
    contact: string,
    position: Position,
    officeId: number,
    dataSource: DataSource,
  ): Promise<Employee> {
    const company = await this.companyService.findOne(companyId);
    const user = await this.usersService.findOneById(userId);
    const office = await this.officeService.findOne(officeId);

    const employeeLike = {
      name: name,
      address: address,
      contact: contact,
      position: position,
      office: office,
      company: company,
      user: user,
    };

    const employee = this.employeeRepository.create(employeeLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(employee);
    });

    return await this.findOne(employee.id);
  }

  async update(
    id: number,
    name: string,
    address: string,
    contact: string,
    officeId: number,
  ): Promise<void> {
    const office = await this.officeService.findOne(officeId);

    const employee = await this.findOne(id);
    employee.name = name;
    employee.address = address;
    employee.contact = contact;
    employee.office = office;
    await this.employeeRepository.save(employee);
  }
}
