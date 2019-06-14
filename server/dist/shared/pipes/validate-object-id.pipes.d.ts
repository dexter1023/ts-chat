import { PipeTransform } from '@nestjs/common';
export declare class ValidateObjectId implements PipeTransform<string> {
    transform(value: string): Promise<string>;
}
