import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { validateEnvironmentVariables } from "./common/utils/validate-env.util";
import { Logger, ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  // Validate environment variables - Fail fast.
  validateEnvironmentVariables();

  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || "*", // Allow all origins in development
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Accept, Authorization",
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Allow implicit type conversion
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Podcast Search API")
    .setDescription(
      "API for searching podcasts from iTunes. " +
        "This API allows you to search for podcasts using the iTunes Search API "
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    customSiteTitle: "Podcasts API Documentation",
    customCss: ".swagger-ui .topbar { display: none }",
  });

  const port = process.env.PORT ?? 8000;
  const environment = process.env.NODE_ENV || "development";

  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`API Documentation: http://localhost:${port}/api/docs`);
  logger.log(`Environment: ${environment}`);
}

bootstrap().catch((error: Error) => {
  console.error("Failed to start application:", error.message);
  process.exit(1);
});
