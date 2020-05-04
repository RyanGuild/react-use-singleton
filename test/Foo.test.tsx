import * as React from "react";

import { expect } from "chai";
import { mount } from "enzyme";

import TestComponent from "./ExampleClass";

describe("<Foo />", () => {
  it("should render", () => {
    const element = <TestComponent />;

    const wrapper = mount(element);
    wrapper.find("button").simulate("click");
    const val = wrapper.find("h1");

    expect(val.getDOMNode().innerHTML).to.equal("1");
  });
});
