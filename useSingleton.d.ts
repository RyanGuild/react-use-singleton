import * as React from "react";
export type Constructor<T, A extends any[]> = {
  name: string;
  new (...args: A): T;
};
export type Singleton<I extends any> = {
  untrackedProperies?: string[];
  [K in I]: I[K];
};
export declare function SingletonProvider(
  props: React.PropsWithChildren<{
    singleton: Singleton;
  }>
): JSX.Element;
export declare function useSingleton<S extends Singleton>(
  singletonClass: Constructor<S>
): S;
export {};
