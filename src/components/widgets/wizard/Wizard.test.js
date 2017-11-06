import React from 'react';
import renderer from 'react-test-renderer';
import Wizard from "./Wizard";

test("Render wizard button", () => {
    const component = renderer.create(
        <Wizard/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // // manually trigger the callback
    // tree.props.onMouseEnter();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
});