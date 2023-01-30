/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserGetDto } from './UserGetDto';

export type UserFindAllDto = {
    users: Array<UserGetDto>;
    /**
     * ID of the last user
     */
    cursor: string;
};

