import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { KeycloakModule } from './keycloak/keycloak.module';

@Module({
  imports: [
    MongooseModule.forRoot('/* mongodb://username:password@host:port/dbname */'),
    ConfigModule.forRoot(),
    TaskModule,
    KeycloakModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//TypeOrmModule.forRoot({
//  type: 'mongodb',
//  url: process.env.MONGO_URL,
//  entities: ['dist/**/*.entity{.ts,.js}'],
//  synchronize: false,
//  logging: true,
//  useNewUrlParser: true,
