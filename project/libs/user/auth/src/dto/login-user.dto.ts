import { ApiProperty } from '@nestjs/swagger';

import { LoginUserDtoDocs } from './login-user.docs';

export class LoginUserDto {
  @ApiProperty(LoginUserDtoDocs.Email)
  public email: string;

  @ApiProperty(LoginUserDtoDocs.Password)
  public password: string;
}
