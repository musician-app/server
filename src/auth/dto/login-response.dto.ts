import { ApiProperty } from "@nestjs/swagger";

class ContentfullUser {
     id: string;
     username: string;
     firstName: string;
     lastName: string;
     email: string;
     avatar: string;
     createdAt: Date;
}


export class LoginResponseDto {
     @ApiProperty()
     user: ContentfullUser;

     @ApiProperty({ description: "JWT Token" })
     token: string;
}