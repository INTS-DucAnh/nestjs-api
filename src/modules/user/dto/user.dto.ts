import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDTO {
     @IsNotEmpty()
     @IsString()
     name: string;

     @IsNotEmpty()
     @IsEmail()
     email: string;

     @IsNotEmpty()
     @IsString()
     password: string;

     @IsOptional()
     @IsString()
     avatar: string;

     @IsOptional()
     @IsNumber()
     age: number;

     @IsOptional()
     @IsNumber()
     roleId: string;
}
