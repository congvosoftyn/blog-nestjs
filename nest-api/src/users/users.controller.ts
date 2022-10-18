import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { LogoutDto } from './dto/logout.dto';
import JwtAuthenticationGuard from 'src/shared/guards/jwtAuthentication.guard';
import { User } from './user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("/register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post("/login")
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const result = await this.usersService.login(body);
    return res.cookie("token", result.token.accessToken, {
      httpOnly: true,
      // secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    }).send(result);
  }

  @Post("/logout")
  @UseGuards(JwtAuthenticationGuard)
  logout(@Body() body: LogoutDto, @Res() res: Response) {
    return res.clearCookie('token', {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 0
    }).send('Logout success!')
  }

  @Get('/verify')
  @UseGuards(JwtAuthenticationGuard)
  verifyToken(@User('userId') userId: number) {
    return this.usersService.findOne(userId)
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
