import * as React from "react";
export type Constructor<T, A extends any[]> = new (...args: A) => T;
export abstract class Singleton {
  untrackedProperies?: string[];
  invalidate(): void;
}
export declare function SingletonProvider(
  props: React.PropsWithChildren<{
    singleton: Singleton;
  }>
): JSX.Element;
export declare function useSingleton<S extends Singleton>(
  singletonClass: Constructor<S>
): S;
export {};
