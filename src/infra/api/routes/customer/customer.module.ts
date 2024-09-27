import { Module } from '@nestjs/common';
import { RegisterCustomerRoute } from './register-customer-route';

@Module({
  controllers: [RegisterCustomerRoute],
})
export class CustomerModule {}
