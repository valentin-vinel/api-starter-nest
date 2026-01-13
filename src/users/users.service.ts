import { Injectable } from '@nestjs/common';
import { User } from 'types/User.type';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "admin",
        },
        {
            id: "2",
            name: "Jim Doe",
            email: "jim.doe@example.com",
            role: "admin",
        },
        {
            id: "3",
            name: "Jill Doe",
            email: "jill.doe@example.com",
            role: "admin",
        },
        {
            id: "4",
            name: "Jack Doe",
            email: "jack.doe@example.com",
            role: "admin",
        },
    ]
}
