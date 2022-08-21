
export enum ErrorType {
  ResponseValidationFailed = -3,
  NetworkError = -2,
  Timeout = -1,
  Unknown = 0,
  OK = 200,
  BadRequest = 400,
  UnAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalError = 500,
}

export const getErrorTypeByCode = (code: number): ErrorType => {
  if (code >= 200 && code < 300) {
    return ErrorType.OK;
  }
  switch (code) {
    case 400:
      return ErrorType.BadRequest;
    case 401:
      return ErrorType.UnAuthorized;
    case 403:
      return ErrorType.Forbidden;
    case 404:
      return ErrorType.NotFound;
    case 500:
      return ErrorType.InternalError;
  }
  return ErrorType.Unknown;
};

export const getErrorMessage = (errorType: ErrorType): string => {
  let error = "خطا در برقراری ارتباط با سرور";
  switch (errorType) {
    case ErrorType.NetworkError:
      return "خطا در اینترنت دستگاه یا اتصال به سرور";
    case ErrorType.OK:
      return "موفق";
    case ErrorType.BadRequest:
      return "پارامترهای ارسالی نادرست است";
    case ErrorType.UnAuthorized:
      return "نیاز به ورود مجدد";
    case ErrorType.Forbidden:
      return "عدم دسترسی";
    case ErrorType.NotFound:
      return "منبع یافت نشد";
    case ErrorType.InternalError:
      return "خطای داخلی سرور";
    case ErrorType.Timeout:
    case ErrorType.Unknown:
      return error;
    default:
      return error;
  }
};

export default interface APIError {
  message: string;
  code: number;
  type: ErrorType;
}
