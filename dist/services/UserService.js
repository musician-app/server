"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    usersControllerFindAll(cursor) {
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
    usersControllerFind(id) {
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