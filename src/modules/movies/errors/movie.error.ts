import { HttpException, HttpStatus } from "@nestjs/common";

export class MovieNotFound extends HttpException {
    constructor() {
        super('movie not found', HttpStatus.NOT_FOUND);
    }
}

export class MovieAlreadyExists extends HttpException {
    constructor() {
        super('Movie Already Exists', HttpStatus.CONFLICT);
    }
}
