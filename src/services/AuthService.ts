/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { RegisterRequestDto } from '../models/RegisterRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Log in
     * Authenticate as a user
     * @param requestBody
     * @returns any Returns token and the user object
     * @throws ApiError
     */
    public login(
        requestBody: LoginRequestDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Username or password provided was incorrect`,
            },
        });
    }

    /**
     * Create a user
     * Register using username, email and password
     * @param requestBody
     * @returns any Returns token and the user object
     * @throws ApiError
     */
    public register(
        requestBody: RegisterRequestDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid body`,
            },
        });
    }

}
