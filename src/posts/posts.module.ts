import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
     imports: [AuthModule, PrismaModule],
     controllers: [PostsController]
})
export class PostsModule {}
