import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import {ApplicationActions} from "../../actions/ApplicationActions";
import {TABLES} from "../../App";
import {EditorStatus} from "../StoresUtils";
import {TablesEditorActions} from "./TablesEditorActions";

export default class TablesNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = TablesNav.makeNavContent(this.props.data);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }



    static makeNavContent(state) {
        let elements = [];

        const editorStatus = state.get('editorStatus');
        const table = state.get('table');

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="tables"
            text="Tavoli"
            active={editorStatus === EditorStatus.SURFING}
            commitAction={() => TablesEditorActions.deselectTable()}
        />);
        if (editorStatus === EditorStatus.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={table.get('name')}
                active={true}
            />);
        } else if (editorStatus === EditorStatus.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={"Nuovo tavolo"}
                active={true}
            />);
        }
        return elements;
    }

}