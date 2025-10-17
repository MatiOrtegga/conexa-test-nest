import { SetMetadata, applyDecorators } from '@nestjs/common';

export function Public() {
  return applyDecorators(SetMetadata('isPublic', true));
}
