import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiUnauthorizedResponse } from "@nestjs/swagger";

export function Public() {
    return applyDecorators(
        SetMetadata('isPublic', true),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    )
}