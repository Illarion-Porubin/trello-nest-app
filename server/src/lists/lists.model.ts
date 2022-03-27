import { HasMany, Column, Model, DataType, Table } from 'sequelize-typescript';
import { Card } from '../card/card.model';
import { Users } from '../users/users.model';


interface CreateListsAttrs {
  title: string;
}

@Table({ tableName: 'lists' })
export class Lists extends Model<Lists, CreateListsAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false })
  title: string;

  @HasMany(() => Card)
  cards: Card[];
}
