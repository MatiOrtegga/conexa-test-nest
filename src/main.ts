import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseSeederService } from './database/database-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const nodeEnv = configService.get<string>('NODE_ENV');

  if (nodeEnv === 'DEV') {
    const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api/v1/docs', app, documentFactory);
    
    //Create roles for first time, for a faster deploy.
    const seeder = app.get(DatabaseSeederService);
    await seeder.seed();
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
