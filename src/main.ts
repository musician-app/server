import helmet from "@fastify/helmet";
import csrf from "@fastify/csrf-protection";
import cookie from "@fastify/cookie";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "dotenv";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { FastifyAdapter } from "@nestjs/platform-fastify/adapters";
import { writeFile } from "fs/promises";

config();

async function bootstrap() {
     const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

     const documentConfig = new DocumentBuilder()
          .setTitle("Musician App API")
          .setDescription("The Musician App API")
          .setVersion("1.0")
          .addBearerAuth({ type: "http", name: "JWT Token", in: "header", bearerFormat: "JWT", scheme: "bearer" }, "defaultJWT")
          .build();

     const document = SwaggerModule.createDocument(app, documentConfig, {
          operationIdFactory(controllerKey, methodKey) {
               return methodKey;
          },
     });

     if (process.env.CI) return await writeFile("./dist/swagger.json", JSON.stringify(document));

     SwaggerModule.setup("swagger", app, document);

     await app.register(helmet);
     await app.register(csrf);
     await app.register(cookie);

     app.enableCors();

     await app.listen(process.env.PORT as string);

     if (process.env.NODE_ENV === "development") {
          console.log(`OpenAI SwaggerUI is ready: http://localhost:${process.env.PORT}/swagger`);
     }
}

bootstrap();