import { ApiProperty } from "@nestjs/swagger";
import { UserGetDto } from "src/users/dto/user-get.dto";

export class PostGetDto {
     @ApiProperty()
     author: UserGetDto;

     @ApiProperty()
     likes: number;

     @ApiProperty()
     comments: number;

     @ApiProperty()
     source: string;

     @ApiProperty()
     description: string;

     @ApiProperty({ description: "ISO Timestamp" })
     createdAt: string;

     @ApiProperty({ description: "ISO Timestamp" })
     updatedAt?: string;
}