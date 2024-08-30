/**
 * Функция выставляет задержку
 * 
 * @param ms — количество миллисекунд ожидания
 */
export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
};