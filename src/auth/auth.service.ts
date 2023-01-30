import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import bcrypt from "bcrypt";
import { PrismaService } from "src/services/prisma.service";
import { jwtConstants } from "./auth.contants";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
     constructor(private userService: UsersService, private jwtService: JwtService, private prisma: PrismaService) {}

     async validateUser(username: string, password: string): Promise<boolean> {
          const user = await this.userService.user({ username }, { username: true, passwordHash: true });
          
          if (!user) return false;

          return await bcrypt.compare(password, user.passwordHash);
     }

     async validateToken(token: string): Promise<User | void> {
          const payload = await this.jwtService.verifyAsync(token, jwtConstants).catch(() => null);

          if (!payload) return void(0);

          const { state, user } = await this.prisma.authorizationTokens.findUnique({ where: { token }, select: { state: true, user: true } });

          if (state === "Destroyed") return void(0);

          return user;
     }

     async grantToken(userId: string): Promise<string> {
          const user = await this.userService.user({ id: userId }, { username: true, email: true, id: true });

          if (!user) throw new HttpException("An internal server error has occured: 0x1", HttpStatus.INTERNAL_SERVER_ERROR);

          await this.prisma.authorizationTokens.updateMany({
               data: {
                    state: "Destroyed"
               },
               where: {
                    userId
               }
          });

          const token = await this.jwtService.signAsync(user, jwtConstants);
          
          await this.prisma.authorizationTokens.create({
               data: {
                    token,
                    userId
               }
          });

          return token;
     }
}