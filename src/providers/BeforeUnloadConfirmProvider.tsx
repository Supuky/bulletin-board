import { useEffect, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onUnload?: (e: Event) => void;
};

/**
 * BeforeUnloadConfirmProvider component
 * @param param - Props for the provider
 * @returns JSX.Element
 */
export function BeforeUnloadConfirmProvider({
  children,
  onUnload: onUnloadProp,
}: Props) {
  useEffect(() => {
    const handleOnBeforeUnload = (event: Event) => {
      event.preventDefault();
    };

    const handleOnUnload = (event: Event) => {
      onUnloadProp?.(event);
    };

    window.addEventListener('beforeunload', handleOnBeforeUnload);
    window.addEventListener('beforeunload', handleOnUnload);

    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload);
      window.removeEventListener('beforeunload', handleOnUnload);
    };
  }, [onUnloadProp]);

  return children;
}
