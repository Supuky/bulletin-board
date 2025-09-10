import type { HTMLProps } from 'react';

export type SignUpContainerProps = Omit<
  HTMLProps<HTMLFormElement>,
  'onSubmit' | 'onChange' | 'noValidate'
>;
