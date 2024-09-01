/**
 * Возвращает типизированную строку из `err` коллбека `catch`
 */
export const getCatchErrorMessage = (error: unknown) => {
  let err = 'Default catch message';

  if (typeof error === "string") {
    err = error.toUpperCase() // works, `error` narrowed to string
  } else if (error instanceof Error) {
    err = error.message // works, `error` narrowed to Error
  }

  return err;
};