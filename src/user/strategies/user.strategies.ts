import { ENV } from 'src/interfaces/env.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EntityManager } from 'typeorm';
import { UserModel } from '../models/user.model';
export const ENV_VARIABLES = process.env as any as ENV;

@Injectable()
export class JwtUserStrategy extends PassportStrategy(
  Strategy,
  'jwt-user-strategy',
) {
  constructor(private manager: EntityManager) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV_VARIABLES.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log(payload);

    const { id, email } = payload.user;
    const user = await this.manager.findOne(UserModel, { email, id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
