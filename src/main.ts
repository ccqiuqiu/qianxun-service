import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ResponseInterceptor} from './common/ResponseInterceptor'
import {HttpExceptionFilter} from './common/HttpExceptionFilter'
import {LoggerService} from './modules/logger/logger.service'
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
    cors: true,
  })
  // app.setGlobalPrefix('api')
  const loggerService = new LoggerService()
  app.useGlobalFilters(new HttpExceptionFilter(loggerService))
  app.useGlobalInterceptors(new ResponseInterceptor(loggerService))
  app.useLogger(loggerService)

  const options = new DocumentBuilder()
    .setTitle('qianxun-service')
    .setDescription('qianxun-service API文档')
    .setVersion('1.0')
    // .setBasePath('api')
    .addBearerAuth({
      name: 'token',
      type: 'apiKey',
      in: 'header',
    })
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document)

  await app.listen(3000)
}

bootstrap()
  .catch(() => {
    console.log('启动失败')
  })

