import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({ example: 'asd@asd.ru', description: 'почта' })
  readonly email: string

  @ApiProperty({ example: '123', description: 'пароль' })
  readonly password: string
}
