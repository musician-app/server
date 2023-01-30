"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    getAll(cursor) {
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
    me() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/@me',
            errors: {
                401: `Authorization header is missing or invalid`,
                404: `User not found`,
            },
        });
    }
    byUuid(id) {
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
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map