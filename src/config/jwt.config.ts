import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        global: true,
        signOptions: {
            expiresIn: '1h',
        },
    })
}