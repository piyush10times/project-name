import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  constructor() {}
  async findRecentEvent(user) {
    try {
      return { user };
    } catch (error) {
      console.log(JSON.stringify(error));

      return {
        error: new HttpException(
          'something went wrong' + error,
          HttpStatus.BAD_REQUEST,
        ),
      };
    }
  }
}
