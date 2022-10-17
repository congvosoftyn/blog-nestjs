import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostEntity } from './post.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([PostEntity])
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
