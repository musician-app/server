import { ApiProperty } from "@nestjs/swagger";

export class UserGetDto {
     @ApiProperty()
     id: string;

     @ApiProperty()
     username: string;

     @ApiProperty()
     avatar: string;

     @ApiProperty()
     firstName: string;

     @ApiProperty()
     lastName: string;

     @ApiProperty()
     followers: number;

     @ApiProperty()
     following: number;
}