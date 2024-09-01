import { delay } from '../../../delay';
import { getCatchErrorMessage } from '../../../error/getCatchErrorMessage';
import { createExecuteError, createExecuteSuccess } from '../../../execute';
import { ControllerBase } from '../ControllerBase';
import { SendMessageController } from './typings';

/**
 * Минимальное необходимое время, которое обязательно должно пройти между сообщениями.
 * 
 * Внутри реализована логика очереди, при попытке отправить сообщение чаще заданного интервала — программа будет ждать
 * и отправит только тогда, когда пройдет не менее `TIME_OFFSET_BETWEEN_NEXT_MESSAGE_SEND` мс с момента отправки последнего сообщения
 */
const TIME_OFFSET_BETWEEN_NEXT_MESSAGE_SEND = 1_000 / 4; // 4 сообщения в секунду звучит норм

/**
 * Контроллер, отвечающий за отправку сообщений
 */
export class Controller_SendMessage extends ControllerBase {
  /**
   * Временная метка последнего отправленного сообщения (необходимо для реализации 'умной очереди')
   */
  protected lastSentMessageTS: number = 0;

  /**
   * Обрабатывается ли в данный момент отправка сообщения пользователя (необходимо для предотвращения DDOS)
   */
  protected isSendMessageProcessing: boolean = false;

  protected setSendMessageProcessingState(isProcessing: boolean) {
    this.isSendMessageProcessing = isProcessing;
  }

  protected getSendMessageProcessingState() {
    return this.isSendMessageProcessing;
  }

  protected setLastSentMessageTS(ts: number) {
    this.lastSentMessageTS = ts;
  }

  protected getLastSentMessageTS() {
    return this.lastSentMessageTS;
  }

  public get(): SendMessageController {
    const messageFn: SendMessageController = (chatId, messageText, messageOptions) => {
      return this.message(chatId, messageText, messageOptions);
    };

    return messageFn;
  }

  protected readonly message: SendMessageController = async (chatId, messageText, messageOptions) => {
    const botAPI = this.botAPI;

    if (!botAPI) {
      return Promise.resolve(createExecuteError('[TelegramBotAPI] Not inited.'));
    }

    /**
     * При повторном вызове функции попадаем в эту ветку и ожидаем, когда завершится выполнение отправки предыдущего сообщения
     */
    if (this.getSendMessageProcessingState()) {
      return new Promise((resolve) => {
        const recursionSendMessage = (intervalTimer: NodeJS.Timeout, timeoutTimer: NodeJS.Timeout) => {
          clearInterval(intervalTimer);
          clearTimeout(timeoutTimer);

          resolve(this.message(chatId, messageText, messageOptions));
        };

        /**
         * Выставляем небольшое число, чтобы не нагружать CPU
         */
        const INTERVAL_STEP = 100;
        const intervalTimer = setInterval(() => {
          /**
           * Ждем, когда завершится отправка прошлого сообщения
           */
          if (!this.getSendMessageProcessingState()) {
            recursionSendMessage(intervalTimer, timeoutTimer);
          }
        }, INTERVAL_STEP);

        const NOTHING_DO_FALLBACK_TIMEOUT = 10_000;
        const timeoutTimer = setTimeout(() => {
          /**
           * Если ничего не произошло за `NOTHING_DO_FALLBACK_TIMEOUT` мс — да и хер с ним!
           * отправляем сообщения дальше по цепочке
           */
          recursionSendMessage(intervalTimer, timeoutTimer);
        }, NOTHING_DO_FALLBACK_TIMEOUT);
      });
    }

    this.setSendMessageProcessingState(true);

    const lastSentMessageTS = this.getLastSentMessageTS();

    /**
     * Проверяем логику времени отправки сообщения, если сообщения ранее уже были
     */
    if (lastSentMessageTS > 0) {
      const nowTS = +new Date();
      const spentTimeFromLastMessage = nowTS - lastSentMessageTS;

      /**
       * Ждем, пока не пройдет нужное время до отправки сообщения
       */
      if (spentTimeFromLastMessage < TIME_OFFSET_BETWEEN_NEXT_MESSAGE_SEND) {
        await delay(TIME_OFFSET_BETWEEN_NEXT_MESSAGE_SEND - (spentTimeFromLastMessage));
      }
    }

    const DEFAULT_OPTIONS = {
      /**
       * Включаем markdown-разметку
       */
      parse_mode: 'Markdown',

      /** 
       * Отключаем превью ссылок
       */
      disable_web_page_preview: true,

      /**
       * Делаем сообщения бесшумными
       */
      disable_notification: true,
    };

    const computedOptions = Object.assign({}, DEFAULT_OPTIONS, messageOptions);

    try {
      /**
       * Непосредственная отправка сообщения
       */
      await botAPI.sendMessage(chatId, messageText, computedOptions);

      /**
       * Обновляем TimeStamp отправленного сообщения
       */
      this.setLastSentMessageTS(+new Date());

      return Promise.resolve(createExecuteSuccess());
    } catch (error) {
      return Promise.resolve(createExecuteError(getCatchErrorMessage(error)));
    } finally {

      /**
       * Тут выполнение закончено
       */
      this.setSendMessageProcessingState(false);
    }
  }
}
