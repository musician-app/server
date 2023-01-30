import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
     imports: [AuthModule, PrismaModule],
     controllers: [UsersController]
})
export class UsersModule {}
