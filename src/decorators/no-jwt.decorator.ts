import { SetMetadata } from "@nestjs/common";

export const NO_JWT_KEY ="noJwt"
export const NoJwt = () => SetMetadata(NO_JWT_KEY, true);