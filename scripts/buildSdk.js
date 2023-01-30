/* eslint-disable */
const generator = require("openapi-typescript-codegen");
const fetch = require("node-fetch")
const fs = require("fs");
const { execSync } = require("child_process");

(async () => {
     fs.mkdirSync("./sdk")

     await generator.generate({
          input: "./dist/swagger.json",
          output: "./sdk/src",
          clientName: "ApiClient"
     })

     fs.writeFileSync("./sdk/tsconfig.json", JSON.stringify({
          "compilerOptions": {
               "module": "commonjs",
               "declaration": true,
               "removeComments": true,
               "emitDecoratorMetadata": true,
               "experimentalDecorators": true,
               "allowSyntheticDefaultImports": true,
               "target": "es2017",
               "sourceMap": true,
               "outDir": "./dist",
               "baseUrl": "./",
               "incremental": true,
               "skipLibCheck": true,
               "strictNullChecks": false,
               "noImplicitAny": false,
               "strictBindCallApply": false,
               "forceConsistentCasingInFileNames": false,
               "noFallthroughCasesInSwitch": false
          }
     }))

     execSync("yarn tsc -p ./sdk/tsconfig.json", {
          cwd: "."
     });

     fs.writeFileSync("./sdk/package.json", JSON.stringify({
          name: "musician-app-sdk",
          main: "./dist/index.js",
          files: ["dist/*"],
          license: "UNLICENSED",
          version: require("../package.json").version
     }));

     fs.copyFileSync("./assets/README.sdk.md", "./sdk/README.md");
})();