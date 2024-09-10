import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CompanyService } from 'src/company/company.service';
import { OfficeService } from 'src/office/office.service';
import { ClientService } from 'src/client/client.service';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private companyService: CompanyService,
    private officeService: OfficeService,
    private employeeService: EmployeeService,
    private clientService: ClientService,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOneByOffice(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { office: { id: id } } });
  }

  findOneBySender(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { sender: { id: id } } });
  }

  findOneByRecipient(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { recipient: { id: id } } });
  }

  findByCompanyId(id: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { company: { id: id } },
    });
  }

  findAllForPeriod(
    companyId: number,
    from: string,
    to: string,
  ): Promise<Order[]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .where(
        `order.companyId = "${companyId}" AND order.receivedDate between "${from}" and "${to}"`,
      )
      .getMany();
  }

  findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async create(
    companyId: number,
    senderId: number,
    recipientId: number,
    weight: number,
    price: number,
    officeWorkerId: number,
    courierId: number,
    sentDate: Date,
    address: string,
    officeId: number,
    receivedDate: Date,
    dataSource: DataSource,
  ): Promise<Order> {
    const company = await this.companyService.findOne(companyId);
    const office = await this.officeService.findOne(officeId);
    const officeWorker = await this.employeeService.findOne(officeWorkerId);
    const courier = await this.employeeService.findOne(courierId);
    const sender = await this.clientService.findOne(senderId);
    const recipient = await this.clientService.findOne(recipientId);

    const orderLike = {
      company: company,
      sender: sender,
      recipient: recipient,
      weight: weight,
      price: price,
      officeWorker: officeWorker,
      courier: courier,
      sentDate: sentDate,
      address: address,
      office: office,
      receivedDate: receivedDate,
    };

    const order = this.orderRepository.create(orderLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(order);
    });

    return await this.findOne(order.id);
  }

  async update(
    id: number,
    recipientId: number,
    officeWorkerId: number,
    courierId: number,
    address: string,
    officeId: number,
  ): Promise<void> {
    const order = await this.findOne(id);
    const office = await this.officeService.findOne(officeId);
    const officeWorker = await this.employeeService.findOne(officeWorkerId);
    const courier = await this.employeeService.findOne(courierId);
    const recipient = await this.clientService.findOne(recipientId);

    order.recipient = recipient;
    order.officeWorker = officeWorker;
    order.courier = courier;
    order.office = office;
    order.address = address;
    await this.orderRepository.save(order);
  }

  async receive(id: number, receivedDate: Date): Promise<void> {
    const order = await this.findOne(id);
    order.receivedDate = receivedDate;
    await this.orderRepository.save(order);
  }
}
