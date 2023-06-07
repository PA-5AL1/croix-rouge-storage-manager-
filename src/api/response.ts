import {
	StatusCodes,
} from 'http-status-codes';

export interface ErrorResponse {
        code: StatusCodes,
        message : string,
        error : string,
}

export interface Response {
    code: StatusCodes,
    message : string,
}

export const response = (response: Response | ErrorResponse) => {
    return JSON.stringify({
        message: response,
      }
    )
  }