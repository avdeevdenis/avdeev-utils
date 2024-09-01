# Avdeev Utils

## Описание

Единая библиотека компонентов/функций, упрощающая жизнь (реализацию фичей, связанных с обработкой и парсингом данных, работой с файлами и чат-ботами в ТГ).

Библиотека публично публикуется в виде npm-пакета [`@avdeev-utils`](https://www.npmjs.com/package/avdeev-utils).

## Установка

Для использования пакета на проекте достаточно его установить:
```
npm install @avdeev-utils@latest
```

## Обновление версии пакета

Для обновления версии пакета можно использовать стандартные возможности npm:
```
npm publish
```

Либо через библиотеку [npm publish (np)](https://www.npmjs.com/package/np):
```
npm run publish
```

## Содержимое:

На данный момент реализована следующая функциональность:
- Методы для контроля хода выполнения функций
  - [createExecuteError](./src/execute/createExecuteError/index.ts)
  - [createExecuteSuccess](./src/execute/createExecuteSuccess/index.ts)
- Работа с JSON
  - [tryParseJSON](./src/tryParseJSON/index.ts)
- Файловая система
  - [createDirectories](./src/fs/createDirectories/index.ts)
  - [getFileContentAsJSON](./src/fs/getFileContentAsJSON/index.ts)
  - [writeFile](./src/fs/writeFile/index.ts)
- Методы для отладки работы кода
  - [debugConsole](./src/debug/debugConsole/index.ts)
  - [debugLog](./src/debug/debugLog/index.ts)
- Телеграм
  - [TelegramBotAPI](./src/telegram/TelegramBotAPI/index.ts)
    - [Controller_SendMessage](./src/telegram/TelegramBotAPI/Controller_SendMessage/index.ts)
- Прочее
  - [getCatchErrorMessage](./src/error/getCatchErrorMessage/index.ts)
  - [delay](./src/delay/index.ts)

Все.