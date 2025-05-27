import type {
  PropsWithoutRef,
  ReactElement,
  ReactNode,
  Ref,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';

/**
 * 汎用的な forwardRef 関数
 * @param render - レンダリング関数
 * @returns forwardRef でラップされたコンポーネント
 */
export function genericForwardRef<T, P = object>(
  render: (props: PropsWithoutRef<P>, ref: Ref<T>) => ReactNode,
): (props: P & RefAttributes<T>) => ReactNode {
  return forwardRef(render) as (
    props: P & RefAttributes<T>,
  ) => ReactElement | null;
}

/**
 * useSyncExternalState の Listener関数 の型定義
 */
export type ReactListener = () => void;
