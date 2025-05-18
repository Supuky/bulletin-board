import { FOOTER_ID, MAIIN_ID } from '@/configs/attributes';
import { clsx } from 'clsx';
import type { HTMLProps } from 'react';
import styles from './styles.module.scss';

type Props = Omit<HTMLProps<HTMLElement>, 'id'> & {
  isLinkNotShown?: boolean;
  mainClassName?: string;
  // TODO: 今後追加予定
  // scrollButtonBottom?: ;
};
// & Omit<ComponentProps<typeof SiteHeader>, "className">

export const SiteLayout = ({
  children,
  className,
  isLinkNotShown,
  mainClassName,
  // scrollButtonBottom,
  // isAuthNotShown,
  // memberType,
  ...attributes
}: Props) => {
  return (
    //  TODO: BaseLayoutに変更予定
    <div
      className={clsx(styles['main-content'], className)}
      // scrollButtonBottom={scrollButtonBottom}
    >
      {
        isLinkNotShown ?
          // TODO: SiteNoMenuHeaderに変更予定
          <div className={styles.header}></div>
          // TODO: SiteHeaderに変更予定
        : <div
            className={styles.header}
            // isAuthNotShown={isAuthNotShown}
            // memberType={memberType}
          ></div>

      }
      <main
        className={clsx(styles.main, mainClassName)}
        id={MAIIN_ID}
        {...attributes}
      >
        {children}
      </main>
      {/* TODO: CommonFooter作成予定 */}
      <footer
        id={FOOTER_ID}
        className={styles.footer}
        // isLinkNotShown={isLinkNotShown}
      ></footer>
    </div>
  );
};
