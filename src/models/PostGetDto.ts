/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserGetDto } from './UserGetDto';

export type PostGetDto = {
    author: UserGetDto;
    likes: number;
    comments: number;
    source: string;
    description: string;
    /**
     * ISO Timestamp
     */
    createdAt: string;
    /**
     * ISO Timestamp
     */
    updatedAt: string;
};

