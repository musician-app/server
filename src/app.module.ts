import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./services/prisma.service";


//TODO: Add ThrottlerModule
@Module({
     imports: [UsersModule, AuthModule],
     controllers: [],
     providers: [PrismaService]
})
export class AppModule {}
