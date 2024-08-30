import { createExecuteError, createExecuteSuccess } from "../../execute";
import { TResponse } from "../../typings/createResponse";

const fs = require('fs');
const path = require('path');

/**
 * Создает директорию в соттветствии по переданному пути.
 * 
 * Путь может содержать '/file-name.extension' на конце
 */
export function createDirectories(filepath: string): Promise<TResponse> {
  if (!filepath) {
    return Promise.resolve(createExecuteError('[createDirectories] Prop pathname does not exists.'));
  }

  const __dirname = path.resolve();

  // Remove leading directory markers, and remove ending /file-name.extension
  const onlyDirectories = filepath.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '');

  return new Promise(resolve => {
    fs.mkdir(path.resolve(__dirname, onlyDirectories), { recursive: true }, (error: Error) => {
      if (error) {
        resolve(createExecuteError(error.message));
      } else {
        resolve(createExecuteSuccess());
      }
    });
  });
}
