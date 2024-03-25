import { BaseEntity } from 'src/common';
import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '~/modules/user/entity/user.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
     @ManyToOne(() => UserEntity, (user) => user.post, {
          eager: false,
          lazy: false,
     })
     user: UserEntity;
}
