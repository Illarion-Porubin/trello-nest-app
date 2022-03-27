import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: /http:\/\/localhost:\d{3,4}/,
    optionsSuccessStatus: 200,
  });
  await app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
}

start();
