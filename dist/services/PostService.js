"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
class PostService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    getAll(cursor) {
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
    byUuid(id) {
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
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map