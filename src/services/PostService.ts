/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostGetDto } from '../models/PostGetDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PostService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all posts
     * Returns a list of posts (15 per request)
     * @param cursor The ID of the last post received.
     * @returns PostGetDto Successful operation
     * @throws ApiError
     */
    public getAll(
        cursor?: string,
    ): CancelablePromise<PostGetDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/posts/get-all',
            query: {
                'cursor': cursor,
            },
            errors: {
                401: `Authorization header is missing or invalid`,
            },
        });
    }

    /**
     * Get post by UUID
     * Returns a post
     * @param id
     * @returns PostGetDto Successful operation
     * @throws ApiError
     */
    public byUuid(
        id: string,
    ): CancelablePromise<PostGetDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Authorization header is missing or invalid`,
                404: `Post not found`,
            },
        });
    }

}
