import { appendFile } from 'fs';
import { createDirectories } from '../../fs';
import { debugConsole } from '../debugConsole';
import { createExecuteError, createExecuteSuccess } from '../../execute';

const { DateTime } = require('luxon');

type DebugLogOptions = {
  /**
   * Если первое сообщение в логах - выставляем delimiter
   */
  isFirstLogMessage?: boolean;

  /**
   * Если присутствует явная ошибка в сообщении лога - маркируем (чтобы было заметнее)
   */
  isError?: boolean;

  /**
   * Любые данные для логирования, преобразуются к строке и дописываются к сообщению
   */
  data?: Object;
};

/**
 * Метод записывает входящие данные 'logData' в файл с названием 'filepath'
 * Если файла не существует - создает по пути
 *
 * @example await debugLog(LOG_PATH, LOG_PREFIX + 'End. nothing left after processing.');
 */
export const debugLog = async (filepath: string, logData: string, options?: DebugLogOptions) => {
  const isCorrectLogData = (
    logData &&
    typeof logData === 'string'
  );

  if (!isCorrectLogData) {
    const errorMessage = `Invalid logData '${logData}' to file '${filepath}'`;
    debugConsole(errorMessage);
    return Promise.resolve(createExecuteError(errorMessage));
  }

  const isCorrectLogFilePath = (
    filepath &&
    typeof filepath === 'string'
  );

  if (!isCorrectLogFilePath) {
    const errorMessage = `Invalid logFilePath '${filepath}'`;
    debugConsole(errorMessage);
    return Promise.resolve(createExecuteError(errorMessage));
  }

  const { success } = await createDirectories(filepath);

  if (!success) {
    const errorMessage = `Error to create directory '${filepath}'`;
    debugConsole(errorMessage);
    return Promise.resolve(createExecuteError(errorMessage));
  }

  return new Promise(resolve => {
    const preparedLogData = prepareLogData(logData, options);

    debugConsole(preparedLogData);

    appendFile(filepath, preparedLogData, (error: NodeJS.ErrnoException | null) => {
      if (error) {
        const errorMessage = `debug_log appendFile error '${error.message}'`;
        debugConsole(errorMessage);
        return resolve(createExecuteError(errorMessage));
      }

      return resolve(createExecuteSuccess());
    });
  });
};

/**
 * Обогащаем сообщение, добавляем к нему:
 * - перенос на новую строку
 * - UNIX_TIMESTAMP
 */
export const prepareLogData = (logData: string, options?: DebugLogOptions) => {
  const isFirstLogMessage = options?.isFirstLogMessage;
  const isError = options?.isError;

  /**
   * Если первое сообщение в логах - выставляем delimiter
   */
  const newLine = isFirstLogMessage ? '\n\n' : '\n';

  const now = DateTime.now().setZone('Europe/Moscow').toISOTime();

  let preparedLogData = '';

  if (isError) {
    preparedLogData = '❌❌❌ ' + logData;
  } else {
    preparedLogData = logData;
  }

  const data = options?.data;
  if (data) {
    preparedLogData += ' Data:`' + JSON.stringify(data) + '`';
  }

  return newLine + `[${now}] ` + preparedLogData;
};