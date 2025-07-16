import { swaggerSetup } from '@/configs/swagger/swagger-setup';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import '@/listeners/send-welcome-email.listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerSetup(app);
  await app.listen(3000);
}
bootstrap();
