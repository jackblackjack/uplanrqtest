import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiExceptionFilter } from './api-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  app.enableCors({
    origin: 'localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
  });
  */

  // Use middleware for development.
  app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', req.header('origin') ?? '*');
    res.header(
      'Access-Control-Allow-Headers',
      'content-type,accept,x-okta-user-agent-extended',
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
  });

  // Set global exception filter.
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ApiExceptionFilter(httpAdapter));

  await app.listen(3000);
}
(async () => await bootstrap())();
