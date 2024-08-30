/**
 * Создает объект с НЕ-успешным результатом выполнения кода
 */
export const createExecuteError = (errorMessage: string) => {
  const ERROR_RESPONSE = {
    // Признак, что НЕ ОК
    success: false,
    // Признак, что есть ошибка
    error: true,
    errorMessage,
  };

  return ERROR_RESPONSE;
};