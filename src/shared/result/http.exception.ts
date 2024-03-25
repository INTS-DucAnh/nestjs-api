import { HttpException, HttpStatus } from "@nestjs/common";
import { ResultError } from "../types";

export class HttpError extends HttpException {
     constructor(
          public error: ResultError,
          status: HttpStatus,
     ) {
          super({ message: error.message }, status);
     }
}
