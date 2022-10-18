import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, QueryPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import JwtAuthenticationGuard from 'src/shared/guards/jwtAuthentication.guard';
import { User } from 'src/users/user.decorator';
import { PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createPostDto: CreatePostDto, @User('userId') userId: number) {
    const post = createPostDto as PostEntity;
    post.userId = userId;
    return this.postsService.create(post);
  }

  @Get()
  findAll(@Query() { cat }: QueryPostDto,) {
    return this.postsService.findAll(cat);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @User('userId') userId: number) {
    return this.postsService.update(+id, updatePostDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string, @User('userId') userId: number) {
    return this.postsService.remove(+id, userId);
  }
}
