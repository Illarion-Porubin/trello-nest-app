import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.sevice';
import { Lists } from './lists.model';
import { Card } from '../card/card.model';
import { Users } from '../users/users.model';

@Module({
  controllers: [ListsController],
  providers: [ListsService],
  imports: [SequelizeModule.forFeature([Lists, Users, Card])],
})
export class ListsModule {}
