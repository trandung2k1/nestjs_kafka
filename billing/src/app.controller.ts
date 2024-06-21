import { Controller, Get, Inject, OnModuleDestroy } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleDestroy {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}
  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }
  onModuleInit() {
    console.log('onModuleInit');
    this.authClient.subscribeToResponseOf('get_user');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('order-created')
  handleOrderCreated(data: any) {
    this.appService.handleOrderCreated(data);
  }
}
