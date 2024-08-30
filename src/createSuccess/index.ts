import { TResponseSuccess, TResponseSuccessOrError } from '../typings/createResponse';

/**
 * Создает объект с успешным результатом работы кода
 */
export const createSuccess = (data?: Object) => {
  const SUCCESS_RESPONSE = {
    success: true,
    error: false,
    data,
  };

  return SUCCESS_RESPONSE;
};

export const isResultSuccess = (response: TResponseSuccessOrError): response is TResponseSuccess => Boolean(response.success);