import { useState } from 'react';

type MapState<K, V> = [K, V][];

// Map APIを模倣したユーティリティフック
export const useMap = <K, V>(initialState: MapState<K, V>) => {
  const [map, setMap] = useState<MapState<K, V>>(initialState ?? []);

  const set = (key: K, value: V) => {
    setMap((prev) => [...prev, [key, value]]);
  };

  const remove = (key: K) => {
    setMap((prev) => prev.filter(([k]) => k !== key));
  };

  const clear = () => {
    setMap([]);
  };

  const get = (key: K) => map.find(([k]) => k === key)?.[1];

  return [map, { set, remove, clear, get }] as const;
};
