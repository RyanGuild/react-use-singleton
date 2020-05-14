import React from "react";
import { useMemo, useState, useContext } from "react";

const SingletonStore = new Map();

export function SingletonProvider(props) {
  const [update, next] = useState(0);

  const sgl = new Proxy(props.singleton, {
    get(target, key, r) {
      if (key === "invalidate") {
        return () => next(update + 1);
      } else {
        return Reflect.get(target, key, r);
      }
    },
    set(target, key, value, r) {
      let curVal = Reflect.get(target, key, r);
      if (value !== curVal) {
        next(update + 1);
      }
      return Reflect.set(target, key, value, r);
    },
  });

  if (props.singleton.constructor.name in SingletonStore.keys()) {
    let Ctx = SingletonStore.get(props.singleton.constructor.name);
    return React.createElement(Ctx.Provider, { value: sgl }, props.children);
  } else {
    let Ctx = React.createContext(sgl);
    SingletonStore.set(props.singleton.constructor.name, Ctx);
    return React.createElement(Ctx.Provider, { value: sgl }, props.children);
  }
}
export function useSingleton(singletonClass) {
  let classname = singletonClass.name;
  if (SingletonStore.has(classname)) {
    let ctx = SingletonStore.get(classname);
    return useContext(ctx);
  } else {
    throw new Error(`A singleton provider with an isntance of a Singleton sub class must be in the react tree
      () => <SingletonProvider singleton={new SingletonSubClass()}>{your app here}</SingletonProvider>
      `);
  }
}
