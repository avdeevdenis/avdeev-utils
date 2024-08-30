import { createError } from '../../createError';
import { createSuccess } from '../../createSuccess';

/**
 * Есть договоренность — всегда возвращать объект такого типа
 */
export type TResponse = TResponseSuccessOrError;

export type TResponseSuccessOrError = TResponseSuccess | TResponseError;
export type TResponseSuccess = ReturnType<typeof createSuccess>;
export type TResponseError = ReturnType<typeof createError>;

/**
 * То же самое, что и выше, только для асинхронности
 */
export type AsyncTResponse = Promise<TResponse>;