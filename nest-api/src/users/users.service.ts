import { SECRET_ACCESS_KEY } from './../configs';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { IToken } from 'src/shared/interfaces/token.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    let user = await UserEntity.findOne({ where: { email: createUserDto.email, } });
    if (!user) {
      user = await UserEntity.findOne({ where: { username: createUserDto.username } });
    }
    if (user) throw new ConflictException('User exits!')

    const salt = await genSalt(10);
    const hashPass = await hash(createUserDto.password, salt);

    const newUser = new UserEntity();
    newUser.email = createUserDto.email;
    newUser.username = createUserDto.username;
    newUser.password = hashPass;

    await newUser.save();
    delete newUser.password;

    return { user: newUser, token: this.generaToken(newUser) };
  }

  async login(login: LoginDto) {
    let user = await UserEntity.findOne({ where: { email: login.email }, select: ["id", "username", "email", "password", "img"] });
    if (!user) throw new BadRequestException('Email or Password incorrect!')

    const checkPasss = await compare(login.password, user.password);
    if (!checkPasss) throw new BadRequestException('Email or Password incorrect!');

    delete user.password;

    return { user: user, token: this.generaToken(user) };
  }

  generaToken(user: UserEntity) {
    const payload: IToken = {
      userId: user.id,
      email: user.email,
      username: user.username
    };
    const accessToken = jwt.sign(payload, SECRET_ACCESS_KEY, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, SECRET_ACCESS_KEY, { expiresIn: '30d' });

    return { accessToken, refreshToken }
  }



  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
