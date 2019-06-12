import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD

  const options = new DocumentBuilder()
    .setTitle('TS Chat')
    .setDescription('TS Chat - dokumentacjaREST API i WS.')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('chat')
    .addTag('ws')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
=======
>>>>>>> f64be6474dffd18c770bac30c98ab3433d54fcbf
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
