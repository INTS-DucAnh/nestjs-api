import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DeepPartial, FindManyOptions, Like, Repository } from 'typeorm';
import { FindReq } from '~/common';
import { configs } from '~/configs';
import { errors, success } from '~/shared/result';
import { Result } from '~/shared/types';
import { CreateUserBody } from './dto/user.body';

@Injectable()
export class UserService {
     constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

     async getAll(params: FindReq): Promise<Result> {
          const page: number = params.page > 1 ? params.page : parseInt(configs.default.page);
          const size: number = params.size > 1 ? params.size : parseInt(configs.default.size);
          const skip: number = (page - 1) * size;
          const query: string = params.query ?? '';

          const findManyOptions: FindManyOptions<UserEntity> = {
               where: { name: Like('%' + query + '%') },
               take: size,
               skip,
               order: { name: 'DESC' },
               select: {
                    name: true,
                    email: true,
                    avatar: true,
                    age: true,
               },
          };

          const [data, total] = await this.userRepository.findAndCount(findManyOptions);
          const totalPage: number = Math.ceil(total / size);

          return success.ok({
               page,
               size,
               total,
               totalPage,
               data,
          });
     }

     async create(params: CreateUserBody): Promise<Result> {
          const check: UserEntity = await this.userRepository.findOne({ where: { email: params.email } });          
          if (check) {
               return errors.exists('email');
          }
          const newUser: UserEntity = this.userRepository.create(params);
          await this.userRepository.save(newUser);
          return success.created(newUser);
     }
}
