import { CustomerModule } from '@/infra/api/routes/customer/customer.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CustomerModule],
})
export class AppModule {}
