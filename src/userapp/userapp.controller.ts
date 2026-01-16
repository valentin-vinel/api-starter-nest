import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
  Query,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserappService } from './userapp.service';
import { Prisma } from '@prisma/client';
import { Role, Roles } from './userapp.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('usersapp')
export class UserappController {
  constructor(private readonly userappService: UserappService) {}

  @Get('admin-only')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getAdminData() {
    return 'This is admin data';
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUser: Prisma.UserCreateInput) {
    const user = this.userappService.create(createUser);
    if (!user) {
      throw new BadRequestException('Failed to create user');
    }
    return user;
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('role') role?: string) {
    const users = this.userappService.findAll(role);
    if (!users) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.userappService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUser: Prisma.UserUpdateInput,
  ) {
    const user = this.userappService.update(id, updatedUser);
    if (!user) {
      throw new BadRequestException('Failed to update user');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    const user = this.userappService.remove(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
