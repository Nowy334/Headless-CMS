import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseMessage = (type, message) => {
      response.status(status).json({
        statusCode: status,
        errorType: type,
        errorMessage: message,
      });
    };

    const isHttpException = exception instanceof HttpException ? true : false;

    if (isHttpException) {
      response.status(status).json(exception.getResponse());
    } else {
      if (exception.message) {
        responseMessage('Error', exception.message);
      } else {
        responseMessage(exception.name, exception.message);
      }
    }
  }
}
