import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCardDto } from './dto/create.card.dto';
import { UpdateCardDto } from './dto/update.card.dto';
import { UsersService } from '../users/users.service';
import { AddCardUsers } from '../card/dto/add.cardUsers.dto';
import { Card } from './card.model';
import { Users } from '../users/users.model';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card) private cardRepository: typeof Card,
    private usersService: UsersService) { }

  async createCard(dto: CreateCardDto) {
    const card = await this.cardRepository.create(dto);
    // const user = await this.usersService.getUserByValue(1)
    // await card.$set('cardUsers', [user.id])
    // card.cardUsers = [user]
    return card;
  }

  async addUser(dto: AddCardUsers) {
    const card = await this.cardRepository.findByPk(dto.cardId);
    const user = await this.usersService.getUserByValue(dto.value);
    console.log(card, "card")
    console.log(user, "user")
    // if (card && user) {
    //   card.cardUsers.push(user) 
    //   await card.save();
    //   return dto;
    // }
    if (card && user) {
      await card.$add('cardUsers', user.id);
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async getAllCards() {
    const cards = await this.cardRepository.findAll({
      include: {
        // model: Users,
        all: true
      },
    });
    return cards;
  }

  async updateCard(updateCardDto: UpdateCardDto) {
    const { id, ...dto } = updateCardDto;
    return await this.cardRepository.update(dto, { where: { id } });
  }

}
