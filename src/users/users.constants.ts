export const PrismaUserGetDtoSelect = {
     id: true,
     username: true,
     avatar: true,
     firstName: true,
     lastName: true,
     _count: {
          select: {
               followers: true,
               following: true
          }
     }
} as const;