import { Expose } from 'class-transformer';

export class BaseDTO {
     @Expose()
     id: string;

     ids: string[];

     deletedDate: Date;

     isActive: boolean;
}
