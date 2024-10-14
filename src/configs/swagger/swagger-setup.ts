import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerSetup = (app: INestApplication<any>): void => {
  const config = new DocumentBuilder()
    .setTitle('Routinely')
    .setVersion('v-2')
    .addBearerAuth({
      type: 'http',
      description: 'Use o `token` adquirido ao acessar a conta',
    })
    .addTag('Customer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
};
