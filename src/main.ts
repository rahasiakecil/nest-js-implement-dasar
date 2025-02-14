import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Konfigurasi Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the application')
    .setVersion('1.0')
    .addTag('example')
    .addBearerAuth() // Menambahkan autentikasi Bearer
    .addApiKey(
      { type: 'apiKey', name: 'x-token-wajib', in: 'header' }, // Menambahkan header kustom
      'x-token-wajib', // Nama key
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //SET ENABLE CORS APP
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(process.env.APP_PORT, async () => {
    console.clear();
    process.stdout.write('\u001b[3J\u001b[2J\u001b[1J');
    console.log('started at port', process.env.APP_PORT);
  });
}
bootstrap();
