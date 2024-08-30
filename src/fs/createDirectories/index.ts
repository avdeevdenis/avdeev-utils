import { createSuccess } from "../../createSuccess";
import { createError } from "../../createError";

const fs = require('fs');
const path = require('path');

type CreateDirResult = ReturnType<typeof createSuccess | typeof createError>;

/**
 * Создает директорию в соттветствии по переданному пути.
 * 
 * Путь может содержать '/file-name.extension' на конце
 */
export function createDirectories(pathname: string): Promise<CreateDirResult> {
  if (!pathname) {
    return Promise.resolve(createError('Prop pathname does not exists.'));
  }

  const __dirname = path.resolve();

  // Remove leading directory markers, and remove ending /file-name.extension
  const onlyDirectories = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '');

  return new Promise(resolve => {
    fs.mkdir(path.resolve(__dirname, onlyDirectories), { recursive: true }, (error: Error) => {
      if (error) {
        resolve(createError(error.message));
      } else {
        resolve(createSuccess());
      }
    });
  });
}
