type ValidationDictionaryEntryIndices = {
  [code in string]?: string | number | undefined;
};

export type ValidationDictionary = {
  [key: string]: ValidationDictionaryEntry;
};

export type ValidationDictionaryEntry = {
  category?: string;
  indices?: ValidationDictionaryEntryIndices;
  name?: string;
  subEntries?: ValidationDictionary;
};

export type ValidationMessageMap =
  | {
      detail: string;
      id: string;
      path: (string | number)[];
      summary: string;
    }
  | undefined;

export type ValidationResultMap = Record<
  string,
  Omit<Exclude<ValidationMessageMap, undefined>, 'id'>
>;
