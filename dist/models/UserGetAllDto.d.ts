import type { UserGetDto } from './UserGetDto';
export type UserGetAllDto = {
    users: Array<UserGetDto>;
    cursor: any;
};
