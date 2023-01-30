import { UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

export function ApiAuthRequires() {
     return function (target) {
          ApiBearerAuth("defaultJWT")(target);
          ApiUnauthorizedResponse({ description: "Authorization header is missing or invalid" })(target);
          UseGuards(AuthGuard)(target);
     };
}