import { useState } from 'react';

type MapState<Key, Value> = [Key, Value][];

export const useMap = <Key, Value>(defaultValue?: MapState<Key, Value>) => {
  const [map, setMap] = useState<MapState<Key, Value>>(defaultValue ?? []);

  const set = (key: Key, value: Value) => {
    setMap((prev) => [...prev, [key, value]]);
  };

  const remove = (key: Key) => {
    setMap((prev) => prev.filter(([k]) => k !== key));
  };

  const clear = () => {
    setMap([]);
  };

  const get = (key: Key) => map.find(([k]) => k === key)?.[1];

  return [map, { set, remove, clear, get }] as const;
};
