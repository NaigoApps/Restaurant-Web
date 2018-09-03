import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import EditorMode from "../../utils/EditorMode";
import {PrintersPageActions} from "./PrintersPageActions";

export default class PrintersNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = PrintersNav.makeNavContent(this.props.data);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        let editor = data.editor;

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="printers"
            text="Stampanti"
            active={!editor.printer}
            commitAction={() => PrintersPageActions.selectPrinter(null)}
        />);
        if (editor.mode === EditorMode.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={editor.printer.name}
                active={true}
            />);
        }else if (editor.mode === EditorMode.CREATING) {
            elements.push(<NavElement
                key="selected"
                text="Creazione stampante"
                active={true}
            />);
        }
        return elements;
    }
}