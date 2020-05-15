# React useSingleton

a library for creating singleton services that trigger rerenders by breaking reference identity with proxies

Peer Dependencies:

- react
- react-dom

```jsx
class Example {
  x = 1;
  constructor(arg) {
    this.x = arg || 1;
  }
}

const App = () => (
  <SingletonProvider singleton={/*create a new instance*/ new Example()}>
    <RestOfTheApp />
  </SingletonProvider>
);
const RestOfApp = () => {
  //same instance as above
  const instance = useSingleton(Example);
  return <span>{instance.x}</span>;
  //return <span>1</span>
};
```

This is achived via js Proxies to trick React into re rendering when a property on the class Instance is changed

Limitations of this method is there is no way to trigger a rerender based on the set of a computed property or observable behavior. Although you may be able to work around this limitation by introducing a component boundry and pass computed properties down as props

All Singletons are instanciated with a method `.invalidate()` that will trigger a rerender

## Typescript Support

```tsx
class Example extends Singleton {
  // Singleton is an abstract class used to allow strict types
  x = 1;
  constructor(arg) {
    super();
    this.x = arg || 1;
  }
}

const App = () => (
  <SingletonProvider singleton={new Example()}>
    <RestOfTheApp />
  </SingletonProvider>
);
const RestOfApp = () => {
  // use this generic to configure the type of the return value
  const instance = useSingleton<Example>(Example);
  return <span>{instance.x}</span>;
};
```
