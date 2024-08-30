import { TResponseError, TResponseSuccessOrError } from '../../typings/createResponse';

/**
 * Функция проверяет результат работы кода и возвращает union ts type если произошла ошибка
 */
export const isEcecuteError = (response: TResponseSuccessOrError): response is TResponseError => Boolean(response.error);