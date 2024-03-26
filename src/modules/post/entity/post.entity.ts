import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
     @ManyToOne(() => UserEntity, (user) => user.post, {
          eager: false,
          lazy: false,
     })
     user: UserEntity;
}
