import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import {EditorStatus} from "../StoresUtils";
import RestaurantNav from "../../components/RestaurantNav";
import {PrintersEditorActions} from "./PrintersEditorActions";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";

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

        let printer = data.get('printer');
        let status = data.get('status');

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="printers"
            text="Stampanti"
            active={status === EditorStatus.SURFING}
            commitAction={() => PrintersEditorActions.deselectPrinter()}
        />);
        if (status === EditorStatus.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={printer.get('name')}
                active={true}
            />);
        }else if (status === EditorStatus.CREATING) {
            elements.push(<NavElement
                key="selected"
                text="Creazione stampante"
                active={true}
            />);
        }
        return elements;
    }
}