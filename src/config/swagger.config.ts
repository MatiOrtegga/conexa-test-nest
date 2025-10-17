import { DocumentBuilder } from "@nestjs/swagger";

export const configSwagger = new DocumentBuilder()
    .setTitle('Conexa Test API')
    .setDescription('API documentation for Conexa Test')
    .setVersion('1.0')
    .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header',
            description: 'Enter your JWT token in the format: Bearer <token>',
        },
        'access-token',
    )
    .build();