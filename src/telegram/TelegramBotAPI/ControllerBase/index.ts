import { TNodeTelegramBotApi } from '../typings';

/**
 * Базовый ТГ-контроллер, от которого наследуются все специфические
 */
export abstract class ControllerBase {
  /**
   * Само API node-js пакета, реализующего взаимодействие с TG
   */
  protected readonly botAPI: TNodeTelegramBotApi;

  constructor(botAPI: TNodeTelegramBotApi) {
    this.botAPI = botAPI;
  }

  /**
   * Возвращает единую функцию, которую необходимо вызвать для реализации основной (и оджной) функциональности класса
   */
  protected get() { }
}