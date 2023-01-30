"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    login(requestBody) {
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
    register(requestBody) {
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
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map