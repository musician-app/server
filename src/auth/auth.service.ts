import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { jwtConstants } from "./auth.contants";
import { AuthorizationTokenState, User } from "@prisma/client";

@Injectable()
export class AuthService {
     constructor(private jwtService: JwtService, private prisma: PrismaService) {}

     async validateUser(username: string, password: string): Promise<[User & { tokens: { token: string }[] }, string] | [null, null]> {
          const user = await this.prisma.user.findUnique({
               where: { username }, 
               select: {
                    id: true,
                    username: true,
                    passwordHash: true,
                    tokens: { where: { state: "Active" }, select: { token: true } },
                    email: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                    createdAt: true
               }});
          
          if (!user) return [null, null];

          if (await bcrypt.compare(password, user.passwordHash)) return [null, null];

          return [user, user.tokens.map(x => x.token)[0] || await this.grantToken(user.id)];
     }

     async validateToken(token: string): Promise<User | void> {
          const payload = await this.jwtService.verifyAsync(token, { algorithms: [jwtConstants.algorithm], publicKey: jwtConstants.publicKey }).catch(() => null);

          if (!payload) return void(0);

          const { state, user } = await this.prisma.authorizationTokens.findUnique({ where: { token }, select: { state: true, user: true } }) as { user: User, state: AuthorizationTokenState; };

          if (state === "Destroyed") return void(0);

          return user;
     }

     async grantToken(userId: string): Promise<string> {
          const user = await this.prisma.user.findFirst({
               where: { id: userId }, 
               select: { username: true, email: true, id: true }
          });

          if (!user) throw new HttpException("An internal server error has occured: 0x1", HttpStatus.INTERNAL_SERVER_ERROR);

          await this.prisma.authorizationTokens.updateMany({
               data: {
                    state: "Destroyed"
               },
               where: {
                    userId
               }
          });

          const token = await this.jwtService.signAsync(user, { algorithm: jwtConstants.algorithm, privateKey: jwtConstants.privateKey });
          
          await this.prisma.authorizationTokens.create({
               data: {
                    token,
                    userId
               }
          });

          return token;
     }
}