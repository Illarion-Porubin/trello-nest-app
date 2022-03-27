import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from 'src/card/card.model';
import { CreateListsDto } from './dto/create.list.dto';
import { Lists } from './lists.model';
import { Users } from '../users/users.model'

@Injectable()
export class ListsService {
  constructor(@InjectModel(Lists) private listsRepository: typeof Lists) {}

  async createList(dto: CreateListsDto) {
    const list = await this.listsRepository.create(dto);
    return list;
  }

  async getAllLists() {
    const lists = await this.listsRepository.findAll({
      include: [
        {
          model: Card,
          include: [{
            model: Users,
          }]
        },
      ],
    });
    return lists;
  }
}
