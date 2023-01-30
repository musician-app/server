import type { UserGetDto } from './UserGetDto';
export type PostGetDto = {
    author: UserGetDto;
    likes: number;
    comments: number;
    source: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};
