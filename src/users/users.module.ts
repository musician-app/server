import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
     imports: [AuthModule, PrismaModule],
     controllers: [UsersController]
})
export class UsersModule {}
