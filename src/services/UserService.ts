/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserGetAllDto } from '../models/UserGetAllDto';
import type { UserGetDto } from '../models/UserGetDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all users in the app
     * Returns a list of users (15 per request)
     * @param cursor The ID of the last user received.
     * @returns UserGetAllDto Successful operation
     * @throws ApiError
     */
    public getAll(
        cursor?: string,
    ): CancelablePromise<UserGetAllDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/get-all',
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
     * Get authenticated user
     * Returns the current user
     * @returns UserGetDto Successful operation
     * @throws ApiError
     */
    public me(): CancelablePromise<UserGetDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/@me',
            errors: {
                401: `Authorization header is missing or invalid`,
                404: `User not found`,
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
    public byUuid(
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
