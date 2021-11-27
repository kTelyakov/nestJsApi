import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserRoles} from "../roles/user-roles.model";
import {Role} from "../roles/roles.model";

interface UserCreationAttrs {
  email: string
  password: string
}


@Table({
  tableName: 'users'
})
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({ example: "1", description: 'Айдишник' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: "user@example.ru", description: 'Почта' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({ example: "QWErt123", description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: true })
  password: string

  @ApiProperty({ example: "false", description: 'Забанен или нет' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean

  @ApiProperty({ example: "спамил!", description: 'Причина бана' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string

  @BelongsToMany(() => User, () => UserRoles)
  roles: Role[]
}
