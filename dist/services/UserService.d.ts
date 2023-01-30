import type { UserFindAllDto } from '../models/UserFindAllDto';
import type { UserGetDto } from '../models/UserGetDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export declare class UserService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    usersControllerFindAll(cursor?: string): CancelablePromise<UserFindAllDto>;
    usersControllerFind(id: string): CancelablePromise<UserGetDto>;
}
