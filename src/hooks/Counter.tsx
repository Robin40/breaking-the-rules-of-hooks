import {useState} from "react";
import {ValueObject} from "immutable";

export interface Counter extends ValueObject {
  value: number;
  increment(): void;
}

export function useCounter(): Counter {
  const [value, setValue] = useState(0);

  function increment(): void {
    setValue(x => x + 1);
  }

  function equals(other: any): boolean {
    return other && value === other.value;
  }

  function hashCode(): number {
    return value | 0;
  }

  return { value, increment, equals, hashCode };
}