import { UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";

export function ApiRequiresAuth() {
     return function (target) {
          ApiBearerAuth("defaultJWT")(target);
          ApiUnauthorizedResponse({ description: "Authorization header is missing or invalid" })(target);
          UseGuards(AuthGuard)(target);
     };
}