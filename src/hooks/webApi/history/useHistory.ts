export const useHistory = () => {
  const replaceState = (url: string, data?: unknown) => {
    window.history.replaceState(data, '', url);
  };

  return {
    replaceState,
  };
};
