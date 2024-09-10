import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class OrderController {
  constructor(
    private orderService: OrderService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  async getOrders(@Request() req) {
    return this.orderService.findByCompanyId(req.query.companyId);
  }

  @Get('order-by-sender')
  async getOrderBySender(@Request() req) {
    return this.orderService.findOneBySender(req.query.clientId);
  }

  @Get('order-by-recipient')
  async getOrderByRecipient(@Request() req) {
    return this.orderService.findOneByRecipient(req.query.clientId);
  }

  @Get('order')
  async getOrder(@Request() req) {
    return this.orderService.findOne(req.query.id);
  }

  @Get('orders-for-period')
  async getIncome(@Request() req) {
    return this.orderService.findAllForPeriod(
      req.query.companyId,
      req.query.fromDate,
      req.query.toDate,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  async createOrder(@Request() req) {
    return this.orderService.create(
      req.body.companyId,
      req.body.senderId,
      req.body.recipientId,
      req.body.weight,
      req.body.price,
      req.body.officeWorkerId,
      req.body.courierId,
      req.body.sentDate,
      req.body.address,
      req.body.officeId,
      req.body.prireceivedDatece,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-order')
  async updateOrder(@Request() req) {
    return this.orderService.update(
      req.body.id,
      req.body.recipientId,
      req.body.officeWorkerId,
      req.body.courierId,
      req.body.address,
      req.body.officeId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('receive-order')
  async receiveOrder(@Request() req) {
    return this.orderService.receive(req.body.id, req.body.receivedDate);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-order')
  async removeOrder(@Request() req) {
    return this.orderService.remove(req.body.id);
  }
}
