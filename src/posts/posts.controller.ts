import { Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Query } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PostGetDto } from "./dto/post-get.dto";
import { PrismaService } from "../prisma/prisma.service";
import { ApiRequiresAuth } from "../decorators/api-requires-auth";
import { PostGetAllDto } from "./dto/post-get-all.dto";
import { OptionalParameterPipe } from "../pipes/optional-parameter.pipe";
import { PrismaPostGetDtoInclude } from "./posts.constants";

@Controller("posts")
@ApiTags("post")
@ApiRequiresAuth()
export class PostsController {

     constructor (private prismaService: PrismaService) {}

     //TODO: Proper recommendation API
     @Get("get-all")
     @ApiQuery({
          name: "cursor",
          description: "The ID of the last post received.",
          required: false
     })
     @ApiOperation({ description: "Returns a list of posts (15 per request)", summary: "List all posts" })
     @ApiOkResponse({ description: "Successful operation", type: PostGetDto })
     async getAll(@Query("cursor", new OptionalParameterPipe(ParseUUIDPipe)) cursor: string): Promise<PostGetAllDto> {
          const posts = await this.prismaService.post.findMany({
               cursor: cursor ? {
                    id: cursor
               } : void(0),
               take: 15,
               include: PrismaPostGetDtoInclude
          });
          
          return {
               users: posts.map(post => ({
                    author: { ...post.author, ...post.author._count, _count: void(0) },
                    likes: post._count.likes,
                    comments: post._count.comments,
                    source: post.source,
                    description: post.description,
                    createdAt: post.createdAt.toISOString(),
                    updatedAt: post.updatedAt?.toISOString()
               })),
               cursor: posts.length ? posts[posts.length - 1].id : null
          } as PostGetAllDto;
     }

     @Get(":id")
     @ApiOperation({ description: "Returns a post", summary: "Get post by UUID" })
     @ApiOkResponse({ description: "Successful operation", type: PostGetDto })
     @ApiNotFoundResponse({ description: "Post not found" })
     async byUUID(@Param("id", ParseUUIDPipe) id: string): Promise<PostGetDto> {
          const post = await this.prismaService.post.findUnique({
               where: { id },
               include: PrismaPostGetDtoInclude
          });

          if (!post) throw new HttpException("Post not found", HttpStatus.NOT_FOUND);

          return {
               author: { ...post.author, ...post.author._count, _count: void(0) },
               likes: post._count.likes,
               comments: post._count.comments,
               source: post.source,
               description: post.description,
               createdAt: post.createdAt.toISOString(),
               updatedAt: post.updatedAt?.toISOString()
          } as PostGetDto;
     }
}
