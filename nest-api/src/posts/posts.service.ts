import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  create(body: PostEntity) {
    return PostEntity.save(body);
  }

  findAll(cat?: string) {
    return PostEntity.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.cat like :search', { search: `%${cat}%` })
      .getMany();
  }

  findOne(id: number) {
    const post = PostEntity.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.id = :id', { id })
      .getOne();

    if (!post) throw new NotFoundException('Post Not found!');
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    this.findOne(id);
    return PostEntity.createQueryBuilder()
      .update(updatePostDto)
      .where('id = :id and userId = :userId', { id, userId })
      .execute();
  }

  remove(id: number, userId: number) {
    return PostEntity.createQueryBuilder()
      .delete()
      .where('id = :id and userId = :userId', { id, userId })
      .execute();
  }
}
