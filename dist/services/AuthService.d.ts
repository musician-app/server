import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { RegisterRequestDto } from '../models/RegisterRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export declare class AuthService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    login(requestBody: LoginRequestDto): CancelablePromise<any>;
    register(requestBody: RegisterRequestDto): CancelablePromise<any>;
}
