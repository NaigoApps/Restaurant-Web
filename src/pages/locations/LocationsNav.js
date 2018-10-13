import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import EditorMode from "../../utils/EditorMode";
import {LocationsPageActions} from "./LocationsPageActions";

export default class LocationsNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = LocationsNav.makeNavContent(this.props);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let editor = data.editor;
        let elements = [];

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="locations"
            text="Postazioni"
            active={!editor.location}
            commitAction={() => LocationsPageActions.selectLocation(null)}
        />);
        if (editor.mode === EditorMode.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={editor.location.name}
                active={true}
            />);
        } else if (editor.mode === EditorMode.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={"Creazione postazione"}
                active={true}
            />);
        }
        return elements;
    }
}