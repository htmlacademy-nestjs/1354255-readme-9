import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@project/auth';
import { BlogUserModule } from '@project/blog-user';
import { getMongooseOptions, UserConfigModule } from '@project/user-config';

@Module({
  imports: [
    BlogUserModule,
    AuthModule,
    UserConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
