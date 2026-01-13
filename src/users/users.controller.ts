import { Controller, Get, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'types/User.type';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService) {};

    @Get()
    @HttpCode(200)
    findAll(): User[] {
        return this.usersService.findAll();
    }
}
