import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import EditorMode from "../../utils/EditorMode";
import {TablesPageActions} from "./TablesPageActions";

export default class TablesNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = TablesNav.makeNavContent(this.props);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const editor = data.editor;

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="tables"
            text="Tavoli"
            active={!editor.table}
            commitAction={() => TablesPageActions.selectTable(null)}
        />);
        if (editor.mode === EditorMode.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={editor.table.name}
                active={true}
            />);
        } else if (editor.mode === EditorMode.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={"Nuovo tavolo"}
                active={true}
            />);
        }
        return elements;
    }

}