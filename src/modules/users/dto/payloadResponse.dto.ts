export class PayloadResponseDto {
    user: {
        email: string;
        name: string;
        role: string;
    }
    tokens: {
        accessToken: string;
        expiresIn: number;
    }
}