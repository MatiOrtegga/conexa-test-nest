import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
        const isProd = config.get('NODE_ENV') === 'PROD';

        return {
            type: 'postgres',
            host: config.get('POSTGRES_HOST'),
            port: +config.get('POSTGRES_PORT'),
            username: config.get('POSTGRES_USER'),
            password: config.get('POSTGRES_PASSWORD'),
            database: config.get('POSTGRES_DATABASE'),
            autoLoadEntities: true,
            synchronize: true,
            ssl: isProd
                ? { rejectUnauthorized: false }
                : false,
        };
    },
};
