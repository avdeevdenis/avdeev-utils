/**
 * Создает объект с успешным результатом выполнения кода
 */
export function createExecuteSuccess<T>(data?: T) {
  const SUCCESS_RESPONSE = {
    // Признак, что все ОК
    success: true,
    // Признак, что нет ошибок
    error: false,
    data,
  };

  return SUCCESS_RESPONSE;
};
