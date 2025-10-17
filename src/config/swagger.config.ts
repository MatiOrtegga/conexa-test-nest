import { DocumentBuilder } from "@nestjs/swagger";

export const configSwagger = new DocumentBuilder()
    .setTitle('Conexa Test API')
    .setDescription('API documentation for Conexa Test')
    .setVersion('1.0')
    .build();