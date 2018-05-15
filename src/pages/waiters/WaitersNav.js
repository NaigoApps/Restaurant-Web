import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import {WaitersEditorActions} from "./WaitersEditorActions";
import {EditorStatus} from "../StoresUtils";

export default class WaitersNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = WaitersNav.makeNavContent(this.props.data);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const editorStatus = data.get('editorStatus');
        const waiter = data.get('waiter');

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="waiters"
            text="Camerieri"
            active={editorStatus === EditorStatus.SURFING}
            commitAction={() => WaitersEditorActions.deselectWaiter()}
        />);
        if (editorStatus === EditorStatus.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={waiter.get('name')}
                active={true}
            />);
        } else if (editorStatus === EditorStatus.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={"Creazione cameriere"}
                active={true}
            />);
        }
        return elements;
    }
}