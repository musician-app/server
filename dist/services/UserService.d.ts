import type { UserGetAllDto } from '../models/UserGetAllDto';
import type { UserGetDto } from '../models/UserGetDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export declare class UserService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    getAll(cursor?: string): CancelablePromise<UserGetAllDto>;
    me(): CancelablePromise<UserGetDto>;
    byUuid(id: string): CancelablePromise<UserGetDto>;
}
