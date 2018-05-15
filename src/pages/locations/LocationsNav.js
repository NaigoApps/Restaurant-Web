import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import {EditorStatus} from "../StoresUtils";
import {LocationsEditorActions} from "./LocationsEditorActions";

export default class LocationsNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = LocationsNav.makeNavContent(this.props.data);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const editorStatus = data.get('editorStatus');
        const location = data.get('location');

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="locations"
            text="Postazioni"
            active={editorStatus === EditorStatus.SURFING}
            commitAction={() => LocationsEditorActions.deselectLocation()}
        />);
        if (editorStatus === EditorStatus.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={location.get('name')}
                active={true}
            />);
        } else if (editorStatus === EditorStatus.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={"Creazione postazione"}
                active={true}
            />);
        }
        return elements;
    }
}