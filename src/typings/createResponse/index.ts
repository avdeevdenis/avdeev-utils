import { createError } from '../../createError';
import { createSuccess } from '../../createSuccess';

/**
 * Есть договоренность — всегда возвращать объект такого типа
 */
export type TResponse = ReturnType<typeof createSuccess | typeof createError>;

/**
 * То же самое, что и выше, только для асинхронности
 */
export type AsyncTResponse = Promise<TResponse>;