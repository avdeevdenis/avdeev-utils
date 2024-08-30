import { TResponseSuccess, TResponseSuccessOrError } from '../../typings/createResponse';

/**
 * Функция проверяет результат работы кода и возвращает union ts type если выполнение закончилось успешно
 */
export const isExecuteSuccess = (response: TResponseSuccessOrError): response is TResponseSuccess => Boolean(response.success);