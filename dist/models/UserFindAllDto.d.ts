import type { UserGetDto } from './UserGetDto';
export type UserFindAllDto = {
    users: Array<UserGetDto>;
    cursor: string;
};
