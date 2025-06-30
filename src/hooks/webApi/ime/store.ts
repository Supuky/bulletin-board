import { KEY_CODES } from '@/enums/keycodes';
import type { ReactListener } from '@/utils/react';
import { isUndefined } from '@/utils/typeGuards';

type ImeStore = {
  current: {
    isComposing: boolean;
  };
};

const state: ImeStore = {
  current: {
    isComposing: false,
  },
};

/**
 * ブラウザによって、onKeyDownとonCompositionEndの順番が異なる
 */
export const createImeStore = () => {
  const subscribeIme = (lisner: ReactListener) => {
    let isDownFirst = false;
    let isEndFirst = false;
    let waitKeyDownTimer: NodeJS.Timeout | undefined = undefined;

    const onCompositionStart = () => {
      isDownFirst = false;
      isEndFirst = false;

      if (!isUndefined(waitKeyDownTimer)) {
        clearTimeout(waitKeyDownTimer);
        waitKeyDownTimer = undefined;
      }

      state.current = {
        isComposing: true,
      };
      lisner();
    };

    const onCompositionEnd = () => {
      state.current = {
        isComposing: false,
      };

      if (isDownFirst) {
        lisner();
        isDownFirst = false;
        return;
      }
      isEndFirst = true;

      waitKeyDownTimer = setTimeout(() => {
        lisner();
        isEndFirst = false;
      }, 15);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KEY_CODES.ENTER) {
        return;
      }

      if (isEndFirst) {
        clearTimeout(waitKeyDownTimer);
        waitKeyDownTimer = undefined;
        lisner();
        isEndFirst = false;
        return;
      }

      isDownFirst = true;
    };

    window.addEventListener('compositionstart', onCompositionStart);
    window.addEventListener('compositionend', onCompositionEnd);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('compositionstart', onCompositionStart);
      window.removeEventListener('compositionend', onCompositionEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  };

  const getImeSnapshot = () => {
    return state.current;
  };

  const getImeServerSnapshot = () => {
    return state.current;
  };

  return {
    subscribeIme,
    getImeSnapshot,
    getImeServerSnapshot,
  };
};
