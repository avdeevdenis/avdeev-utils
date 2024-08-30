import { createError } from "../../createError";
import { createSuccess } from "../../createSuccess";
import { TResponse } from "../../typings/createResponse";
import { createDirectories } from "../createDirectories";

const fs = require('fs');

/**
 * Записывает содержимое 'fileContentJSON' в файл по пути 'filepath'
 * 
 * @param filepath
 * @param fileContentJSON
 */
export const writeFile = async (filepath: string, fileContentJSON: Object): Promise<TResponse> => {
  await createDirectories(filepath);

  return new Promise((resolve) => {
    fs.writeFile(filepath, JSON.stringify(fileContentJSON), { encoding: 'utf8' }, (error: Error) => {
      if (error) {
        resolve(createError(error.message));
      } else {
        resolve(createSuccess());
      }
    });
  });
};