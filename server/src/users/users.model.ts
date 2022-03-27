import { Column, Model, DataType, Table, BelongsToMany } from 'sequelize-typescript';
import { Lists } from '../lists/lists.model';
import { Card } from '../card/card.model';
import { cardsUsers } from './users.cardsUsers'

interface UserCreationAttrs {
  value: number;
  name: string;
  email: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.INTEGER, unique: true, allowNull: true})
  value: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  email: string;

  @BelongsToMany(() => Card, () => cardsUsers)
  cardUsers: Card[];
}
