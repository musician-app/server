import { JwtSignOptions } from "@nestjs/jwt";
import { readFileSync } from "fs";

export const jwtConstants = {
     algorithm: "RS256",
     privateKey: readFileSync("./certs/jwtRS256.key"),
     publicKey: readFileSync("./certs/jwtRS256.key.pub")
} as JwtSignOptions;