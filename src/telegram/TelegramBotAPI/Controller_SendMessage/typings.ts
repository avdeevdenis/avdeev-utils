import { ChatId, SendMessageOptions } from 'node-telegram-bot-api';
import { TResponse } from '../../../typings/createResponse';

/**
 * Отправить сообщение в ТГ
 * API https://core.telegram.org/bots/api#sendmessage
 *
 * @param chatId - ID-чата, куда необходимо отправить сообщение | see @ChatId
 * @param messageText - Текст сообщения
 * @param messageOptions - see @SendMessageOptions
 *
 * @returns {Promise<TResponse>}
 */
export type SendMessageController = (chatId: ChatId, messageText: string, messageOptions?: SendMessageOptions) => Promise<TResponse>;