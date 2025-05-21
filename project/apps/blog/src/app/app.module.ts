import { Module } from '@nestjs/common';
import { BlogCommentModule } from '@project/blog-comment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BlogCommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
