import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envs } from './config';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { CountriesModule } from './weather/weather.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: envs.db.databaseUrls,
        autoLoadEntities: true,
        synchronize: true,
        ssl: true,
        useUnifiedTopology: true
      }),
    }),

    UsersModule,
    AuthModule,
    CountriesModule,
    TasksModule,
  ],
})
export class AppModule { }
