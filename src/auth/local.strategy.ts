import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const userObject = await this.authService.validateUser(username, password);

    if (!userObject.user && userObject.message) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          errorType: 'UNAUTHORIZED',
          errorMessage: userObject.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userObject.user) {
      throw new UnauthorizedException();
    }

    return userObject.user;
  }
}
