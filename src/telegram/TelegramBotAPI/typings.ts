import { prototype } from 'node-telegram-bot-api';

export * from './Controller_SendMessage/typings';

export type TNodeTelegramBotApi = typeof prototype;

/**
 * Данные, которые на вход принимает TG-бот при инициализации
 */
export type TelegramBotConstructorData = {
  /**
   * Access-token, который выдается при регистрации бота
   */
  token: string;
};