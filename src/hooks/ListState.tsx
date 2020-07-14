import React, {ReactElement, useCallback, useEffect, useRef, useState} from "react";
import {List, Map, ValueObject} from "immutable";
import {v4 as uuidv4} from "uuid";
import {nullThrows} from "../utils/nullThrows";

export type ListState<T> = {
  values: List<T>;
  add(): void;
  remove(index: number): void;
  getKey(index: number): string;
  render(): ReactElement;
};

export function useListState<T extends ValueObject>(hookFn: () => T): ListState<T> {
  const [keys, setKeys] = useState(List<string>());
  const [store, setStore] = useState(Map<string, T>());

  const values = keys.map(key => store.get(key))
      .filter(x => x !== undefined) as List<T>;

  function add(): void {
    setKeys(list => list.push(uuidv4()));
  }

  function remove(index: number): void {
    const key = getKey(index);
    setKeys(list => list.remove(index));
    setStore(dict => dict.remove(key));
  }

  function getKey(index: number): string {
    return nullThrows(keys.get(index));
  }

  const render = useCallback((): ReactElement => {
    return <>
      {keys.map(key => (
          <Hook
              key={key}
              hookFn={hookFn}
              onChange={value => {
                setStore(dict => dict.set(key, value));
              }}
          />
      ))}
    </>;
  }, [keys, hookFn]);

  return { values, add, remove, getKey, render };
}

type HookProps<T> = {
  hookFn(): T;
  onChange(value: T): void;
};

function Hook<T extends ValueObject>({ hookFn, onChange }: HookProps<T>) {
  const value = hookFn();
  const prev = useRef<T>();

  useEffect(() => {
    if (!value.equals(prev.current)) {
      prev.current = value;
      onChange(value);
    }
  }, [value, onChange]);

  return null;
}