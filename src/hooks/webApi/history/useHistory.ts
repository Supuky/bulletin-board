/**
 * ブラウザの履歴を管理するカスタムフック。
 * @returns {Object} - replaceState 関数を含むオブジェクト。
 */
export const useHistory = () => {
  const replaceState = (url: string, data?: unknown) => {
    window.history.replaceState(data, '', url);
  };

  return {
    replaceState,
  };
};
