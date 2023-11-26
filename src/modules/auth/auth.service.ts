import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async validateGoogleUser(profile: any): Promise<any> {
    return {
      email: profile.emails[0].value,
      displayName: profile.displayName,
    };
  }
  async generateToken(data: any): Promise<any> {
    return {
      token: jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
          data,
        },
        process.env.JWTKEY,
      ),
    };
  }
}
