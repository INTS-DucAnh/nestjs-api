import { IsNotEmpty } from 'class-validator';

export class CreateUserBody {
     @IsNotEmpty()
     name: string;

     @IsNotEmpty()
     age: number;

     @IsNotEmpty()
     email: string;

     @IsNotEmpty()
     role: string;

     @IsNotEmpty()
     password: string;
}
