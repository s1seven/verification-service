// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonly<T> =
  T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
      T extends object ? DeepReadonlyObject<T> :
        T;

export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
