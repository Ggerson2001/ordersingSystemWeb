import { writable, derived } from "svelte/store";

export const dict = writable();
export const locale = writable("en");

const localizedDict = derived([dict, locale], ([$dict, $locale]) => {
  if (!$dict || !$locale) return;

  return $dict[$locale];
});

const getMessageFromLocalizedDict = (id, localizedDict) => {
  const splitId = id.split(".");
  let message = { ...localizedDict };
  splitId.forEach((partialID) => {
    message = message[partialID];
  });
  return message;
};

const onCreateMessageFormatter = (localizedDict) => (id) =>
  getMessageFromLocalizedDict(id, localizedDict);

export const t = derived(localizedDict, ($localizedDict) => {
  return onCreateMessageFormatter($localizedDict);
});
