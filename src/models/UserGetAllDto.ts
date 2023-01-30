/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserGetDto } from './UserGetDto';

export type UserGetAllDto = {
    users: Array<UserGetDto>;
    /**
     * ID of the last user
     */
    cursor: any;
};

