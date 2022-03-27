import {
  BelongsTo,
  BelongsToMany,
  HasMany,
  Column,
  Model,
  DataType,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Lists } from '../lists/lists.model';
import { Users } from '../users/users.model';
import { cardsUsers } from '../users/users.cardsUsers'

interface CardCreateAttr {
  title: string;
  description: string;
}

@Table({ tableName: 'card' })
export class Card extends Model<Card, CardCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Lists)
  listId: number;

  @BelongsTo(() => Lists)
  list: Lists;

  @Column({ type: DataType.STRING, unique: false })
  title: string;

  @Column({ type: DataType.STRING, unique: false })
  description: string;

  @BelongsToMany(() => Users, () => cardsUsers)
  cardUsers: Users[];
}
