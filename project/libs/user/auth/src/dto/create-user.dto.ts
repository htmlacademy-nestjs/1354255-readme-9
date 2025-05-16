import { ApiProperty } from '@nestjs/swagger';

import { CreateUserDtoDocs } from './create-user.docs';

export class CreateUserDto {
  @ApiProperty(CreateUserDtoDocs.Email)
  public email: string;

  @ApiProperty(CreateUserDtoDocs.Name)
  public name: string;

  @ApiProperty(CreateUserDtoDocs.Password)
  password: string;
}
