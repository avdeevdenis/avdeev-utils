import { createExecuteError, createExecuteSuccess } from '../../execute';
import { tryParseJSON } from '../../tryParseJSON';
import { TResponse } from '../../typings/createResponse';

const fs = require('fs');

/**
 * Читает содержимое файла и возвращает его результат, преобразованный, через 'JSON.parse()'
 */
export const getJSONFileContent = async (filepath: string): Promise<TResponse> => {
  if (!filepath) {
    return Promise.resolve(createExecuteError('[getJSONFileContent] Prop pathname does not exists.'));
  }

  return new Promise((resolve) => {
    fs.readFile(filepath, 'utf8', (error: Error, content: Object) => {
      if (error) {
        resolve(createExecuteError(error.message));
      } else {
        if (content && typeof content === 'string' && content.length) {
          const jsonContent = tryParseJSON<Object>(content);

          const resolveResult = jsonContent ?
            createExecuteSuccess(jsonContent) :
            createExecuteError('[getJSONFileContent] Cannot parse as JSON.')

          resolve(resolveResult);
        }
      }
    });
  });
};