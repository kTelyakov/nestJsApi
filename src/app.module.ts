import { Module } from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize'
import { UsersModule } from './users/users.module';
import {ConfigModule} from '@nestjs/config'
import {User} from "./users/users.model";

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
      models: [User],
      autoLoadModels: true
    }),
    UsersModule,
  ]
 })
 export class AppModule {

 }
