import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/services/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { UsersModule } from "src/users/users.module";

@Module({
     imports: [JwtModule, forwardRef(() => UsersModule)],
     providers: [AuthService, AuthGuard, PrismaService],
     exports: [AuthGuard, AuthService]
})
export class AuthModule {}
