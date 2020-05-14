import * as React from "react";
interface Constructor<T> {
    name: string;
    new (): T;
}
interface Singleton {
    untrackedProperies?: string[];
    constructor: Constructor<any>;
}
export declare function SingletonProvider(props: React.PropsWithChildren<{
    singleton: Singleton;
}>): JSX.Element;
export declare function useSingleton<S extends Singleton>(singletonClass: Constructor<S>): S;
export {};
