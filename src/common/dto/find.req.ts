import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FindReq {
     @IsNotEmpty()
     @IsNumber({})
     page: number;

     @IsNotEmpty()
     @IsNumber()
     size: number;

     @IsOptional()
     query: string;
}
