import {Injectable, InternalServerErrorException} from '@nestjs/common';

@Injectable()
export class AuthService {
  private mockUser = {
    email: 'asd',
    token: 'asdads',
    username: 'adasd',
    bio: 'asdasd',
    image: 'asdad'
  }

  register () {
    return this.mockUser
  }

  login (credentials: any) {
    if (credentials.email === this.mockUser.email) {
      return this.mockUser
    }
    throw new InternalServerErrorException()
  }


}
