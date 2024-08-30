import { createExecuteError, createExecuteSuccess } from "../../execute";

/**
 * Есть договоренность — всегда возвращать объект такого типа
 */
export type TResponse = TResponseSuccessOrError;

export type TResponseSuccessOrError = TResponseSuccess | TResponseError;
export type TResponseSuccess = ReturnType<typeof createExecuteSuccess>;
export type TResponseError = ReturnType<typeof createExecuteError>;

/**
 * То же самое, что и выше, только результата для асинхронной функции
 */
export type AsyncTResponse = Promise<TResponse>;