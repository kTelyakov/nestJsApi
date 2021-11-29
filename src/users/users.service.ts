import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {
  }

  async createUser (dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue("ADMIN") // Сходили за ролью
    await user.$set('roles', [role.id]) // По умолчанию присваиваем роль
    user.roles = [role]
    return user
  }

  async getAllUsers () {
    const users = await this.userRepository.findAll({ include: { all: true } })
    return users
  }

  async getUserById (id: string) {
    const user = await this.userRepository.findOne({ where: { id } })
    return user
  }

  async getUserByEmail (email: string) {
    const user = this.userRepository.findOne({ where: { email }, include: { all: true } })
    return user
  }
}
