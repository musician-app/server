import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
     imports: [JwtModule, PrismaModule],
     controllers: [AuthController],
     providers: [AuthService, AuthGuard],
     exports: [AuthGuard, AuthService]
})
export class AuthModule {}
