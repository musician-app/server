import { ApiProperty } from "@nestjs/swagger";
import { PostGetDto } from "./post-get.dto";

export class PostGetAllDto {
     @ApiProperty({ type: [PostGetDto] })
     users: PostGetDto[];

     @ApiProperty({ description: "ID of the last post" })
     cursor: string | null;
}