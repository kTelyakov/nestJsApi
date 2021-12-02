import { Module } from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize'
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';

 @Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: +process.env.POSTGRESS_PORT,
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      models: [],
      autoLoadModels: true
    }),
    AuthModule
  ]
 })
 export class AppModule {

 }
