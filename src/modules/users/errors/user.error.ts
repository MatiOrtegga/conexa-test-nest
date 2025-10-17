import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExists extends HttpException {
    constructor() {
        super('User already exists.', HttpStatus.CONFLICT);
    }
}

export class InvalidEmail extends HttpException {
    constructor() {
        super('Incorrect Email provided.', HttpStatus.UNAUTHORIZED);
    }
}
export class IncorrectPassword extends HttpException {
    constructor() {
        super('Incorrect credentials provided.', HttpStatus.UNAUTHORIZED);
    }
}