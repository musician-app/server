import { PrismaUserGetDtoSelect } from "../users/users.constants";

export const PrismaPostGetDtoInclude = {
     author: {
          select: PrismaUserGetDtoSelect
     },
     _count: {
          select: {
               likes: true,
               comments: true
          }
     }
} as const;