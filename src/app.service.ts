import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getUsers () {
    return [{ shet: 'from service' }]
  }
}