import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { CardModule } from './card/card.module';
import { Lists } from './lists/lists.model';
import { Users } from './users/users.model';
import { Card } from './card/card.model';
import { cardsUsers } from './users/users.cardsUsers'
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      models: [Users, Lists, Card, cardsUsers],
      autoLoadModels: true,
    }),
    ListsModule,
    UsersModule,
    CardModule,
  ],
})
export class AppModule {}
