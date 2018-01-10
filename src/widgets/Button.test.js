import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import Button from "./Button";

it('basic button', () => {
    const btn = renderer.create(
        <Button/>
    ).toJSON();
    expect(btn).toMatchSnapshot();
});

it('disabled button', () => {
    const btn = renderer.create(
        <Button disabled/>
    ).toJSON();
    expect(btn).toMatchSnapshot();
});

it('text button', () => {
    const btn = renderer.create(
        <Button text="TEST"/>
    ).toJSON();
    expect(btn).toMatchSnapshot();
});

it('icon button', () => {
    const btn = renderer.create(
        <Button icon="ICON"/>
    ).toJSON();
    expect(btn).toMatchSnapshot();
});

it('action button', () => {
    const callback = jest.fn();

    const btn = shallow(<Button commitAction={callback}/>);

    btn.find('button').simulate('click');
    expect(callback.mock.calls.length).toBe(1);
});

// it('action disabled button', () => {
//     const callback = jest.fn();
//
//     const btn = shallow(<Button disabled={true} commitAction={callback}/>);
//
//     btn.find('button').simulate('click');
//     expect(callback.mock.calls.length).toBe(0);
//
// });

