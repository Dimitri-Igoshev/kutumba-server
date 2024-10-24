import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { HttpService } from '@nestjs/axios';
import { getAuthCallUri } from 'src/common/helper/getAuthCallUri';
import { UserService } from 'src/user/user.service';
import { getPhoneDigits } from 'src/common/helper/getPhoneDigits';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService, private UserService: UserService, private jwtService: JwtService) { }

  async sendCode(phone: string) {
    const { data } = await this.httpService.axiosRef.get(getAuthCallUri(phone))

    if (!data?.code)
      throw new HttpException('Auth code not recived', HttpStatus.INTERNAL_SERVER_ERROR);

    const isExist: any = await this.UserService.findByPhone(phone)

    if (isExist) {
      this.UserService.update(isExist._id, { authCode: data.code })
    } else {
      this.UserService.create({ phone: getPhoneDigits(phone), authCode: data.code })
    }

    return data.code
  }

  async generateTokens({ phone, code }: any) {
    const user: any = await this.UserService.findByPhone(phone)

    if (!user)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (user.authCode !== code)
      throw new HttpException('Auth code not match', HttpStatus.UNAUTHORIZED);

    this.UserService.update(user._id, { authCode: '' })

    return {
      accessToken: await this.createToken({
        _id: user._id,
        role: user.role,
        phone: user.phone,
      }, '7d'),
    };
  }

  async refreshTokens(refreshToken: string) {

  }

  private async createToken(payload, expiresIn: string): Promise<string> {
    return await this.jwtService.signAsync(payload, { expiresIn });
  }
}
