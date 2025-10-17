
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

interface ExceptionResponse {
    statusCode: number;
    message: string | string[];
    error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse() as ExceptionResponse;
        const errorMessage = Array.isArray(exceptionResponse.message)
            ? exceptionResponse.message
            : exceptionResponse.message || exception.message;

        response
            .status(status)
            .json({
                message: errorMessage,
                error: exceptionResponse.error || exception.message || null,
                statusCode: status,
            });
    }
}
