/**
 * Создает объект с успешным результатом выполнения кода
 */
export const createExecuteSuccess = (data?: Object) => {
  const SUCCESS_RESPONSE = {
    // Признак, что все ОК
    success: true,
    // Признак, что нет ошибок
    error: false,
    data,
  };

  return SUCCESS_RESPONSE;
};