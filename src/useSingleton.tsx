import * as React from "react";
import { useMemo, useState, useCallback, useContext } from "react";

interface Constructor<T> {
  name: string;
  new (): T;
}

interface Singleton {
  untrackedProperies?: string[];
  constructor: Constructor<any>;
}

const SingletonStore = new Map<string, React.Context<any>>();

export function SingletonProvider(
  props: React.PropsWithChildren<{ singleton: Singleton }>
) {
  const [update, next] = useState(0);

  const dirtyRefBreaker: (s: Singleton) => Iterator<Singleton> = useCallback(
    function* (singleton: any) {
      singleton = new Proxy(singleton, {
        get(target, key) {
          if (key === "invalidate") {
            return () => next(update + 1);
          } else {
            return Reflect.get(target, key);
          }
        },
        set(self, key, value) {
          if (
            !self.hasOwnProperty("untrackedProperies") ||
            !(key in self.untrackedProperies)
          )
            next(update + 1);
          return Reflect.set(self, key, value);
        },
      });
      while (true) yield singleton;
    },
    [next, update]
  );

  const sglIter = useMemo(() => dirtyRefBreaker(props.singleton), [
    props.singleton,
    dirtyRefBreaker,
  ]);

  console.log(props.singleton.constructor.name);
  console.log(SingletonStore);
  console.log(props.singleton);
  console.log(sglIter);
  console.log(dirtyRefBreaker);

  if (props.singleton.constructor.name in SingletonStore.keys()) {
    let Ctx = SingletonStore.get(props.singleton.constructor.name);
    return (
      <Ctx.Provider value={sglIter.next().value}>{props.children}</Ctx.Provider>
    );
  } else {
    let Ctx = React.createContext(null);
    SingletonStore.set(props.singleton.constructor.name, Ctx);
    return (
      <Ctx.Provider value={sglIter.next().value}>{props.children}</Ctx.Provider>
    );
  }
}

export function useSingleton<S extends Singleton>(
  singletonClass: Constructor<S>
): S {
  let classname = singletonClass.name;
  if (classname in SingletonStore.keys()) {
    let ctx = SingletonStore.get(classname);
    return useContext(ctx);
  } else {
    throw new Error(
      `A singleton provider with an isntance of a Singleton sub class must be in the react tree
      () => <SingletonProvider singleton={new SingletonSubClass()}>{your app here}</SingletonProvider>
      `
    );
  }
}
