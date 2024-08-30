/**
 * Создает объект с НЕ-успешным результатом работы кода
 */
export const createError = (errorMessage: string) => {
  const ERROR_RESPONSE = {
    success: false,
    error: true,
    errorMessage,
  };

  return ERROR_RESPONSE;
};