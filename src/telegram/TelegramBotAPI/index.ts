import { debugConsole } from "../../debug";
import { createExecuteError, createExecuteSuccess, isExecuteError, isExecuteSuccess } from "../../execute";
import { Controller_SendMessage } from "./Controller_SendMessage";
import { SendMessageController, TelegramBotConstructorData, TNodeTelegramBotApi } from "./typings";

export { TelegramBotConstructorData } from './typings';

const NodeTelegramBotApi = require('node-telegram-bot-api');

/**
 * Бот для взаимодействия с пользователем, используя API Telegram
 */
export class TelegramBotAPI {
  protected instance: TNodeTelegramBotApi | null = null;

  /**
   * Контроллер, отвечающий за отправку сообщений
   */
  protected readonly Controller_SendMessage!: SendMessageController;

  constructor(input: TelegramBotConstructorData) {
    const createdResult = this.create(input.token);

    if (isExecuteError(createdResult)) {
      debugConsole('[TelegramBotAPI] create ERROR. message = ' + createdResult.errorMessage);
    } else if (isExecuteSuccess(createdResult)) {
      debugConsole('[TelegramBotAPI] created OK.');

      const instance = this.instance;

      /**
       * Инициализируем контроллеры, отвечающие за инкапсуляцию реализации конкретных фичей
       */
      if (instance !== null) {
        this.Controller_SendMessage = new Controller_SendMessage(instance).get();
      }
    }

    return this;
  }

  protected create(token: string) {
    if (!token) {
      return createExecuteError('Telegram API token does not provided.');
    }

    const instance: TNodeTelegramBotApi = new NodeTelegramBotApi(token, {
      polling: true
    });

    this.setInstance(instance);

    return instance ?
      createExecuteSuccess(instance) :
      createExecuteError(`TelegramBot instance can't create.`);
  }

  protected isOK(instance: TNodeTelegramBotApi | null) {
    const checkIsOKInstance = (instance: TNodeTelegramBotApi | null): instance is TNodeTelegramBotApi => (Boolean(instance) && typeof instance?.sendMessage === 'function');
    return checkIsOKInstance(instance);
  }

  protected setInstance(instance: TNodeTelegramBotApi) {
    this.instance = instance;
  }

  protected getInstance() {
    return this.isOK(this.instance) ? this.instance : undefined;
  }

  /**
   * Отправить сообщение в ТГ
   * API https://core.telegram.org/bots/api#sendmessage
   */
  public message: SendMessageController = async (chatId, messageText, messageOptions) => {
    return this.Controller_SendMessage(chatId, messageText, messageOptions);
  }
}