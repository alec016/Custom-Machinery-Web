import { Numbers, HexLetters } from 'types'
type HexChar = HexLetters | Numbers

type HexType<T extends string> =
  T extends `${infer R1}${infer R2}${infer R3}`
  ? R1 extends HexChar
    ? R2 extends HexChar
      ? `${R1}${R2}${HexType<R3>}`
      : never
    : never
  : T extends `${infer R1}${infer R2}`
    ? R1 extends `${HexChar}${HexChar}`
      ? `${R1}${HexType<R2>}`
      : never
  : `${T}`;

export type HexColor<T extends string> = `#${HexType<T>}`
