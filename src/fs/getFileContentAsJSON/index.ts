import { createError } from "../../createError";
import { createSuccess } from "../../createSuccess";
import { tryParseJSON } from "../../tryParseJSON";
import { TResponse } from "../../typings/createResponse";

const fs = require('fs');

/**
 * Возвращает содержимое файла, преобразованное, через 'JSON.parse()'
 */
export const getJSONFileContent = async (filepath: string): Promise<TResponse> => {
  if (!filepath) {
    return Promise.resolve(createError('[getJSONFileContent] Prop pathname does not exists.'));
  }

  return new Promise((resolve) => {
    fs.readFile(filepath, 'utf8', (error: Error, content: unknown) => {
      if (error) {
        resolve(createError(error.message));
      } else {
        if (content && typeof content === 'string' && content.length) {
          const jsonContent = tryParseJSON(content);

          resolve(jsonContent ? createSuccess(jsonContent) : createError('[getJSONFileContent] Cannot parse as JSON.'));
        }
      }
    });
  });
};