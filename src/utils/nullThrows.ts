export function nullThrows<T>(x: T | null | undefined): T {
  if (x == null) throw new TypeError();
  else return x;
}