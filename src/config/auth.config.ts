import { registerAs } from '@nestjs/config';
import { ENV } from '../interfaces/env.interface';
export const ENV_VARIABLES = process.env as any as ENV;

export default registerAs('auth', () => ({
  jwt: {
    secret: ENV_VARIABLES.JWT_SECRET,
    signOptions: {
      expiresIn: '4h',
    },
  },
}));
