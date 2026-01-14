import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from 'types/User.type';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService) {};

    @Get()
    @HttpCode(200)
    findAll(): User[] {
        return this.usersService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id', ParseIntPipe) id: number): User {
        return this.usersService.findOne(id);
    }

    @Get()
    @HttpCode(200)
    findAllWithQuery(
        @Query('page') page: string,
        @Query('limit') limit: string,
    ): string {
        return `Page: ${page}, Limit: ${limit}`;
    }

    @Post()
    @HttpCode(201)
    create(@Body() user: User): User {
        return this.usersService.create(user);
    }

    @Patch(':id')
    @HttpCode(200)
    update(@Param('id', ParseIntPipe) id: number, @Body() user: User): User {
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    @HttpCode(200)
    delete (@Param('id', ParseIntPipe) id: number): string {
        return this.usersService.delete(id);
    }
}
