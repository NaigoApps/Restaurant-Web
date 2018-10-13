import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import EditorMode from "../../utils/EditorMode";
import {WaitersPageActions} from "./WaitersPageActions";

export default class WaitersNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = WaitersNav.makeNavContent(this.props);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const editor = data.editor;

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="waiters"
            text="Camerieri"
            active={!editor.waiter}
            commitAction={() => WaitersPageActions.selectWaiter(null)}
        />);
        if (editor.mode === EditorMode.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={editor.waiter.name}
                active={true}
            />);
        } else if (editor.mode === EditorMode.CREATING) {
            elements.push(<NavElement
                key="selected"
                type="info"
                text={"Creazione cameriere"}
                active={true}
            />);
        }
        return elements;
    }
}