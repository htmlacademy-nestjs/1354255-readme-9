import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { LoggedUserRdoDocs } from './logged-user.docs';

export class LoggedUserRdo {
  @ApiProperty(LoggedUserRdoDocs.Id)
  @Expose()
  public id: string;

  @ApiProperty(LoggedUserRdoDocs.Email)
  @Expose()
  public email: string;

  @ApiProperty(LoggedUserRdoDocs.AccessToken)
  @Expose()
  public accessToken: string;
}
