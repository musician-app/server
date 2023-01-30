import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
import { PostsModule } from "./posts/posts.module";


//TODO: Add ThrottlerModule
@Module({
     imports: [UsersModule, AuthModule, PostsModule],
     controllers: [],
     providers: [PrismaService]
})
export class AppModule {}
