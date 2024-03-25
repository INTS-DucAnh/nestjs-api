import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { PostModule } from './modules/post/post.module';
import { RoleModule } from './modules/role/role.module';
import { PostCategoryModule } from './modules/post-category/post-category.module';

@Module({
    imports: [
        UserModule,
        CategoryModule,
        PostModule,
        RoleModule,
        PostCategoryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
