import { BaseEntity, RoleEnum } from 'src/common';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PostEntity } from '~/modules/post/entity/post.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
     @Column({})
     name: string;

     @Column({})
     email: string;

     @Column({})
     password: string;

     @Column({})
     avatar: string;

     @Column({})
     age: number;

     @Column({ default: 0 })
     failLogin: number;

     @Column({ type: 'timestamptz', nullable: true })
     lastLocked: Date;

     @OneToMany(() => PostEntity, (post) => post.user)
     post: PostEntity[];

     @Column({ type: 'enum', enum: RoleEnum })
     role: string;

     @BeforeInsert()
     async hashPasswordCreate() {
          this.password = await bcrypt.hash(this.password.toString(), 10);
     }

     @BeforeUpdate()
     async hashPasswordUpdate() {
          this.password = await bcrypt.hash(this.password.toString(), 10);
     }
}
