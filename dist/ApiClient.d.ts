import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { UserService } from './services/UserService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export declare class ApiClient {
    readonly user: UserService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
}
export {};
