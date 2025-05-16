import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import dayjs from 'dayjs';

import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthError } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) { }

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const {email, name, password} = dto;

    const blogUser = {
      email, name, avatarId: '', registrationDate: dayjs(new Date()).toDate(),
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthError.UserExists);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password)

    this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthError.UserNotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.UserCredentialsWrong);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthError.UserNotFound);
    }

    return user;
  }
}
