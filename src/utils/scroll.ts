/**
 * スクロールをページのトップに移動させる関数
 * @returns {void}
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
