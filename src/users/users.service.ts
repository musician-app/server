
import { Injectable } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class UsersService {
     constructor(private prisma: PrismaService) { }

     async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<Prisma.UserGetPayload<{ select: Prisma.UserSelect }> | void>
     async user<T extends Prisma.UserSelect>( userWhereUniqueInput: Prisma.UserWhereUniqueInput, select?: T ): Promise<Prisma.UserGetPayload<{ select: T }> | void>
     async user<T extends Prisma.UserSelect>( userWhereUniqueInput: Prisma.UserWhereUniqueInput, select?: T ): Promise<Prisma.UserGetPayload<{ select: T }> | void> {
          return this.prisma.user.findUnique({
               where: userWhereUniqueInput,
               select
          });
     }

     async users<T extends Prisma.UserFindManyArgs>(params: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>): Promise<Prisma.UserGetPayload<T>[]> {
          return this.prisma.user.findMany(params);
     }

     async createUser(data: Prisma.UserCreateInput): Promise<User> {
          return this.prisma.user.create({
               data,
          });
     }

     async updateUser(params: {
          where: Prisma.UserWhereUniqueInput;
          data: Prisma.UserUpdateInput;
     }): Promise<User> {
          const { where, data } = params;
          return this.prisma.user.update({
               data,
               where,
          });
     }

     async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
          return this.prisma.user.delete({
               where,
          });
     }
}
