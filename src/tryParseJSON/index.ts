/**
 * Функция пытается распарсить строку как JSON и возвращает результат или 'undefined'
 *
 * @param jsonString 
 */
export function tryParseJSON<T = unknown>(jsonString?: string): T | undefined {
  try {
    return typeof jsonString === 'string' ? JSON.parse(jsonString) : undefined;
  } catch (e) {
    return undefined;
  }
}
