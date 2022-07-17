import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import authConfig from './config/auth.config';
import dbConfig from './config/db.config';
import { envValidationSchema } from './config/env.validate';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig, authConfig],
      validationSchema: envValidationSchema,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    UserModule,
    EventEmitterModule.forRoot({ global: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
