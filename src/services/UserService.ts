/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserFindAllDto } from '../models/UserFindAllDto';
import type { UserGetDto } from '../models/UserGetDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all users in the app
     * Returns a list of users (15 per request)
     * @param cursor The ID of the last user received.
     * @returns UserFindAllDto Successful operation
     * @throws ApiError
     */
    public usersControllerFindAll(
        cursor?: string,
    ): CancelablePromise<UserFindAllDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/findAll',
            query: {
                'cursor': cursor,
            },
            errors: {
                401: `Authorization header is missing or invalid`,
                502: `Validation failed (uuid is expected)`,
            },
        });
    }

    /**
     * Find user by UUID
     * Returns a single user
     * @param id
     * @returns UserGetDto Successful operation
     * @throws ApiError
     */
    public usersControllerFind(
        id: string,
    ): CancelablePromise<UserGetDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Authorization header is missing or invalid`,
                404: `User not found`,
            },
        });
    }

}
