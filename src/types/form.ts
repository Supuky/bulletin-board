import type { FormEvent } from 'react';

export type onFormAsyncSubmit = (
  e: FormEvent<HTMLFormElement>,
) => Promise<void>;
