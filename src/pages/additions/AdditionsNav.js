import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import {EditorStatus} from "../StoresUtils";
import {AdditionsEditorActions} from "./AdditionsEditorActions";

export default class AdditionsNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = AdditionsNav.makeNavContent(this.props.data);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const editorStatus = data.get('editorStatus');
        const addition = data.get('addition');

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="additions"
            text="Varianti"
            active={editorStatus === EditorStatus.SURFING}
            commitAction={() => AdditionsEditorActions.deselectAddition()}
        />);
        if (editorStatus === EditorStatus.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={addition.get('name')}
                active={true}
            />);
        } else if (editorStatus === EditorStatus.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={"Creazione variante"}
                active={true}
            />);
        }
        return elements;
    }
}