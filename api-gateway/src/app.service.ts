import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderRequest } from './create-order-request';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  createOrder({ userId, price }: CreateOrderRequest) {
    this.billingClient.emit(
      'order-created',
      new OrderCreatedEvent('123', userId, price),
    );
  }
}
