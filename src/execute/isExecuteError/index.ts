import { TResponseError, TResponseSuccessOrError } from '../../typings/createResponse';

/**
 * Функция проверяет результат работы кода и возвращает union ts type если произошла ошибка
 */
export const isExecuteError = (response: TResponseSuccessOrError): response is TResponseError => Boolean(response.error);