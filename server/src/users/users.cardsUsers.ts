import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Users} from "./users.model";
import {Card} from "../card/card.model";


@Table({createdAt: false, updatedAt: false})
export class cardsUsers extends Model<cardsUsers> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Card)
    @Column({type: DataType.INTEGER})
    cardId: number;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER})
    userId: number;
}