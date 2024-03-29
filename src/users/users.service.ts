import {Body, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

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
    return this.userRepository.findOne({ where: { email }, include: { all: true } })
  }

  async addRole (dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)
    if (role && user) {
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
  }

  async ban (dto: BanUserDto) {

  }
}
