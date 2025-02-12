import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
