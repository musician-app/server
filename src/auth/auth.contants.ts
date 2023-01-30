import { readFileSync } from "fs";

export const jwtConstants = {
     algorithm: "RS256",
     privateKey: process.env.CI ? "" : readFileSync("./certs/jwtRS256.key"),
     publicKey: process.env.CI ? "" : readFileSync("./certs/jwtRS256.key.pub")
} as const;