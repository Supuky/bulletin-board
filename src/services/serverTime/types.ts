export type ServerTimeProps = {
  serverTime: number;
};

export type WithServerTimeProps<T extends object = object> = T &
  ServerTimeProps;
