import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/services/prisma.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
     imports: [forwardRef(() => AuthModule)],
     controllers: [UsersController],
     providers: [UsersService, PrismaService],
     exports: [UsersService]
})
export class UsersModule {}
