import { IsNotEmpty } from 'class-validator';

export class SendMailCretaeUser {
     @IsNotEmpty()
     mailUser: string;

     @IsNotEmpty()
     name: string;

     @IsNotEmpty()
     createDate: Date;
}
