import type { PostGetDto } from '../models/PostGetDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export declare class PostService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    getAll(cursor?: string): CancelablePromise<PostGetDto>;
    byUuid(id: string): CancelablePromise<PostGetDto>;
}
