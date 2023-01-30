import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
     imports: [AuthModule, PrismaModule],
     controllers: [PostsController]
})
export class PostsModule {}
