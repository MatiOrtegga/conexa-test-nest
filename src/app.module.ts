import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [UsersModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
