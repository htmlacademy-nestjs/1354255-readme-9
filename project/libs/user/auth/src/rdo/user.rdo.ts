import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UserRdoDocs } from './user.docs';

export class UserRdo {
  @ApiProperty(UserRdoDocs.Id)
  @Expose()
  public id: string;

  @ApiProperty(UserRdoDocs.AvatarId)
  @Expose()
  public avatarId: string;

  @ApiProperty(UserRdoDocs.Email)
  @Expose()
  public email: string;

  @ApiProperty(UserRdoDocs.Name)
  @Expose()
  public name: string;
}
