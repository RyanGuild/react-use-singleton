import * as React from "react";
import { useSingleton, Singleton } from "useSingleton";

class TestSingleton extends Singleton {
  val: number;
  constructor() {
    super();
    this.val = 0;
  }
}

export default function TestComponent() {
  let inst = useSingleton(TestSingleton);

  return (
    <div>
      <h1>{inst.val}</h1>
      <TestComponent2 />
    </div>
  );
}

function TestComponent2() {
  let inst = useSingleton(TestSingleton);

  return <button onClick={() => (inst.val += 1)}></button>;
}
